/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useEffect, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { GetAnswerChoicesResponse, GetAnswersResponse, GetAssessmentResponse, getAssessment } from "../../../../services";
import { getAnswers, verifyAssessment } from "../../../../services/StudentApi";
import { useAtom } from "jotai";
import { toast } from "../../../../store/ToastStore";
import { useNavigate, useParams } from "react-router-dom";
import { merge } from "../../../../utils";
import React from "react";

type TChoices = {
  choiceId: number;
  choiceType: "A" | "B" | "C" | "D";
  choice: string;
  answer: boolean;
  selected: boolean;
}

type TQuestions = {
  questionNumber: number;
  question: string;
  choices: TChoices[];
};

export const AssessmentConfirmation = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const [assessment, setAssessment] = useState<GetAssessmentResponse | null>(null);
  const [questions, setQuestions] = useState<TQuestions[]>([]);
  const [isDenied, setIsDenied] = useState(false);
  const [getToast, setToast] = useAtom(toast);

  const fetchAnswers = async (email: string) => {
    try {
      const studentId = sessionStorage.getItem("student.studentId");
      const { data } = await getAnswers(
        Number(params["id"]),
        studentId ?? "",
        email,
      );
      if (data.status === 200 && data.message == "Success") {
        const remoteQuestions = data.data.map((value: GetAnswersResponse) => {
          return {
            questionNumber: Number(value.question_number),
            question: value.question,
            choices: value.choices.map((choices: GetAnswerChoicesResponse) => {
              return {
                choiceId: Number(choices.choiceId),
                choiceType: choices.choiceType,
                choice: choices.choice,
                answer: choices.answer === "true",
                selected: choices.selected === "true"
              }
            })
          }
        });
        setQuestions(remoteQuestions);
      }
    } catch (error) {
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  const fetchAssessment = async () => {
    setIsDenied(false);
    try {
      const { data } = await getAssessment(Number(params["id"]));
      if (data.status === 200 && data.message === "Success") {
        const assessment = data.data[0];
        setAssessment(assessment);
        if (assessment.assessment_status === "ACTIVE") {
          verifyAsessment(
            Number(assessment.id),
            Number(assessment.subject_id),
            () => {
              fetchAnswers(assessment.email ?? "")
            }
          );
        } else {
          setIsDenied(true);
        }
      }
    } catch (error) {
      setIsDenied(true);
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  const verifyAsessment = async (
    assessmentId: number,
    subjectId: number,
    onVerify: () => void
  ) => {
    try {
      const { data } = await verifyAssessment(
        assessmentId.toString(),
        subjectId.toString(),
        sessionStorage.getItem("student.studentId") ?? ""
      );
      if (data.status === 200 && data.message === "Success") {
        setIsDenied(false);
        onVerify();
      } else {
        setIsDenied(true);
      }
    } catch (error) {
      console.error(error);
      setIsDenied(true);
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  useEffect(() => {
    fetchAssessment()
  }, []);

  const isAnswerCorrect = (choice: TChoices): boolean => {
    return choice.selected === true && choice.answer === true;
  };

  const isAnswerWrong = (choice: TChoices): boolean => {
    if (choice.selected && choice.answer) {
      return false;
    }
    if (choice.selected && choice.answer === false) {
      return true;
    }
    return false;
  };

  const isAnAnswer = (choice: TChoices): boolean => {
    return choice.answer === true;
  };

  const isChoosenAnswer = (choice: TChoices): boolean => {
    return choice.selected === true;
  };

  const displayChoice = (letter: string, choice: string | undefined): JSX.Element => {
    if (choice && choice.length > 0) {
      return (<><b>{`${letter}.)`}</b>&nbsp;{choice}</>);
    }
    return (<><b>{`${letter}.)`}</b>&nbsp;{"No option added."}</>);
  };

  const displayIcon = (choice: TChoices): JSX.Element => {
    if (isAnswerCorrect(choice)) {
      return <i className="fa-solid fa-circle-check text-[#198754]"></i>;
    }
    if (isAnAnswer(choice)) {
      return <i className="fa-solid fa-circle-check text-[#198754]"></i>;
    }
    if (isChoosenAnswer(choice)) {
      return <i className="fa-solid fa-circle-xmark text-[red]"></i>;
    }
    return <i className="fa-regular fa-circle"></i>;
  };

  const countCorrectAnswers = (questions: TQuestions[]): number => {
    let correct = 0;
    questions.forEach((value: TQuestions) => {
      correct += value.choices.filter((choices: TChoices) => {
        return choices.selected && choices.answer;
      }).length;
    })
    return correct;
  };

  const isPassed = (questions: TQuestions[]): boolean => {
    return countCorrectAnswers(questions) >= (questions.length / 2);
  };

  return (
    <>
      <div className="min-h-screen full bg-[#F0F0F0] flex flex-col p-[20px] gap-[15px]">
        <Row>
          <Col lg={3}></Col>
          <Col lg={6} md={12} sm={12}>
            <div className="rounded-[10px] border-t-[5px] border-[#198754] py-[12px] px-[16px] bg-[#FFFFFF]">
              <h3 className="open-sans-700 text-[25px]">
                {isDenied ? (
                  <>{"This form is not accepting any responses."}</>
                ) : (
                  <>
                    {assessment === null ? (
                      <>{"Loading Assessment Title ..."}</>
                    ) : (
                      <>{assessment?.assessment_title}</>
                    )}
                  </>
                )}
              </h3>
              <p className="open-sans text-[#8c8c8c] mt-[8px]">
                {isDenied ? (
                  <>
                    {
                      "Unable to access this form. This might be that the owner is not accepting any responses " +
                      "or you are not granted an access to view this form. Please contact your administrator / " +
                      "instructor if there are any issues regarding the status of this form "
                    }
                  </>
                ) : (
                  <>
                    {assessment === null ? (
                      <>{"Loading Assessment Description, Please wait ..."}</>
                    ) : (
                      <>{assessment?.assessment_description}</>
                    )}
                  </>
                )}
              </p>
              <div className="flex flex-row items-center gap-[10px] mt-[20px]">
                <h3 className={merge("open-sans-600 text-[#198754] text-[16px]", {
                  "text-[red]": isPassed(questions) ? false : true
                })}>
                  Test Score: <b>{countCorrectAnswers(questions)}/{questions.length}</b>&nbsp;
                </h3>
                <Badge bg={isPassed(questions) ? "success" : "danger"}>
                  {isPassed(questions) ? <>{"PASSED"}</> : <>{"FAILED"}</>}
                </Badge>
              </div>
            </div>
          </Col>
          <Col lg={3}></Col>
        </Row>
        {questions.map((value: TQuestions, index:number) => {
          return (
            <React.Fragment key={index}>
              <Row>
                <Col lg={3}></Col>
                <Col lg={6} md={12} sm={12}>
                  <div className="rounded-[10px] py-[16px] px-[16px] bg-[#FFFFFF]">
                    <Badge bg="success open-sans-700 uppercase">
                      {`Question No. ${value.questionNumber}`}
                    </Badge>
                    <div className="border-[1px] rounded-[7px] mt-[10px] px-[15px] py-[10px]">
                      <p className="open-sans-600 text-[#000000] text-[17px]">
                        {value.question}
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] mt-[20px]">
                      <div className="flex flex-row gap-[10px] items-center">
                        <div className="flex-1 flex flex-row gap-[10px] items-center">
                          <div
                            className={merge(
                              "px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                                "border-[#198754]": isAnswerCorrect(value.choices[0]),
                                "border-[red]": isAnswerWrong(value.choices[0]),
                                "open-sans-600": isAnswerCorrect(value.choices[0]) || value.choices[0].selected,
                                "text-[#198754]": isAnswerCorrect(value.choices[0]),
                                "text-[red]": isAnswerWrong(value.choices[0]),
                                "text-[#c8c8c8]": value.choices[0].choice.length === 0
                            })}>
                            {displayIcon(value.choices[0])}
                            {displayChoice("A", value.choices[0].choice)}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-row gap-[10px] items-center">
                          <div
                            className={merge(
                              "px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                                "border-[#198754]": isAnswerCorrect(value.choices[1]),
                                "border-[red]": isAnswerWrong(value.choices[1]),
                                "open-sans-600": isAnswerCorrect(value.choices[1]) || value.choices[1].selected,
                                "text-[#198754]": isAnswerCorrect(value.choices[1]),
                                "text-[red]": isAnswerWrong(value.choices[1]),
                                "text-[#c8c8c8]": value.choices[1].choice.length === 0
                            })}>
                            {displayIcon(value.choices[1])}
                            {displayChoice("B", value.choices[1].choice)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-[10px] items-center">
                        <div className="flex-1 flex flex-row gap-[10px] items-center">
                          <div
                            className={merge(
                              "px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                              "border-[#198754]": isAnswerCorrect(value.choices[2]),
                              "border-[red]": isAnswerWrong(value.choices[2]),
                              "open-sans-600": isAnswerCorrect(value.choices[2]) || value.choices[2].selected,
                              "text-[#198754]": isAnswerCorrect(value.choices[2]),
                              "text-[red]": isAnswerWrong(value.choices[2]),
                              "text-[#c8c8c8]": value.choices[2].choice.length === 0
                            })}>
                            {displayIcon(value.choices[2])}
                            {displayChoice("C", value.choices[2].choice)}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-row gap-[10px] items-center">
                          <div
                            className={merge(
                              "px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                              "border-[#198754]": isAnswerCorrect(value.choices[3]),
                              "border-[red]": isAnswerWrong(value.choices[3]),
                              "open-sans-600": isAnswerCorrect(value.choices[3]) || value.choices[3].selected,
                              "text-[#198754]": isAnswerCorrect(value.choices[3]),
                              "text-[red]": isAnswerWrong(value.choices[3]),
                              "text-[#c8c8c8]": value.choices[3].choice.length === 0
                            })}>
                            {displayIcon(value.choices[3])}
                            {displayChoice("D", value.choices[3].choice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={3}></Col>
              </Row>
            </React.Fragment>
          )
        })}
        <Row>
          <Col lg={3}></Col>
          <Col lg={6} md={12} sm={12}>
            <div className="flex flex-row gap-[12px]">
              <Button variant="success" className="open-sans" onClick={() => {
                navigate("/students/dashboard");
              }}>
                <i className="fa-solid fa-arrow-left-long"></i>&nbsp;&nbsp;&nbsp;Back
              </Button>
              <Button variant="outline-success" className="open-sans" onClick={() => {}}>
                <i className="fa-solid fa-file-arrow-down"></i>&nbsp;&nbsp;&nbsp;Download Result
              </Button>
            </div>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
    </>
  );
};
