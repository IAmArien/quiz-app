/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Badge, Button, Col, Row, Toast } from "react-bootstrap";
import { GetAssessmentResponse, GetChoicesResponse, GetQuestionsResponse, getAssessment, getQuestions } from "../../../services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { toast } from "../../../store/ToastStore";
import { verifyAssessment } from "../../../services/StudentApi";
import React from "react";
import { merge } from "../../../utils";

type TChoices = {
  choiceId: number;
  choiceType: "A" | "B" | "C" | "D";
  choice: string;
  answer: boolean;
  selected?: boolean;
}

type TQuestions = {
  questionNumber: number;
  question: string;
  choices: TChoices[];
};

export const Assessment = (): JSX.Element => {
  const params = useParams();
  const [assessment, setAssessment] = useState<GetAssessmentResponse | null>(null);
  const [questions, setQuestions] = useState<TQuestions[]>([]);
  const [isDenied, setIsDenied] = useState(false);
  const [getToast, setToast] = useAtom(toast);

  const fetchQuestions = async (email: string) => {
    try {
      const { data } = await getQuestions(Number(params["id"]), email);
      if (data.status === 200 && data.message == "Success") {
        const remoteQuestions = data.data.map((value: GetQuestionsResponse) => {
          return {
            questionNumber: Number(value.question_number),
            question: value.question,
            choices: value.choices.map((choices: GetChoicesResponse) => {
              return {
                choiceId: Number(choices.choiceId),
                choiceType: choices.choiceType,
                choice: choices.choice,
                answer: choices.answer === "true"
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
              fetchQuestions(assessment.email ?? "")
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
    fetchAssessment();
  }, []);

  const displayChoice = (letter: string, choice: string | undefined): JSX.Element => {
    if (choice && choice.length > 0) {
      return (<><b>{`${letter}.)`}</b>&nbsp;{choice}</>);
    }
    return (<><b>{`${letter}.)`}</b>&nbsp;{"No option added."}</>);
  }

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
                              "cursor-pointer px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                                "border-[#198754]": value.choices[0].selected === true,
                                "text-[#c8c8c8]": value.choices[0].choice.length === 0,
                                "cursor-not-allowed": value.choices[0].choice.length === 0
                            })}
                            onClick={() => {}}>
                            {value.choices[0].selected ? (
                              <i className="fa-solid fa-circle-check"></i>
                            ) : (
                              <i className="fa-regular fa-circle"></i>
                            )}
                            {displayChoice("A", value.choices[0].choice)}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-row gap-[10px] items-center">
                          <div
                            className={merge(
                              "cursor-pointer px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                                "border-[#198754]": value.choices[1].selected === true,
                                "text-[#c8c8c8]": value.choices[1].choice.length === 0,
                                "cursor-not-allowed": value.choices[1].choice.length === 0
                            })}
                            onClick={() => {}}>
                            {value.choices[1].selected ? (
                              <i className="fa-solid fa-circle-check"></i>
                            ) : (
                              <i className="fa-regular fa-circle"></i>
                            )}
                            {displayChoice("B", value.choices[1].choice)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-[10px] items-center">
                        <div className="flex-1 flex flex-row gap-[10px] items-center">
                          <div
                            className={merge(
                              "cursor-pointer px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                              "border-[#198754]": value.choices[2].selected === true,
                              "text-[#c8c8c8]": value.choices[2].choice.length === 0,
                              "cursor-not-allowed": value.choices[2].choice.length === 0
                            })}
                            onClick={() => {}}>
                            {value.choices[2].selected ? (
                              <i className="fa-solid fa-circle-check"></i>
                            ) : (
                              <i className="fa-regular fa-circle"></i>
                            )}
                            {displayChoice("C", value.choices[2].choice)}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-row gap-[10px] items-center">
                          <div
                            className={merge(
                              "cursor-pointer px-[15px] py-[10px] border-[1px] rounded-[7px] flex-1 flex flex-row items-center gap-[10px] open-sans", {
                              "border-[#198754]": value.choices[3].selected === true,
                              "text-[#c8c8c8]": value.choices[3].choice.length === 0,
                              "cursor-not-allowed": value.choices[3].choice.length === 0
                            })}
                            onClick={() => {}}>
                            {value.choices[3].selected ? (
                              <i className="fa-solid fa-circle-check"></i>
                            ) : (
                              <i className="fa-regular fa-circle"></i>
                            )}
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
            <div className="pb-[20px]">
              <Button variant="success" className="w-full" onClick={() => {}}>
                <i className="fa-solid fa-clipboard-check"></i>&nbsp;&nbsp;Submit Answers
              </Button>
            </div>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
      <div className="z-[9999] absolute left-0 right-0 bottom-0 mb-[20px] flex flex-col justify-center items-center">
        <Toast show={getToast.show} autohide onClose={() => setToast({
          show: false,
          title: "",
          description: ""
        })}>
          <Toast.Header>
            <strong className="me-auto">{getToast.title}</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{getToast.description}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};
