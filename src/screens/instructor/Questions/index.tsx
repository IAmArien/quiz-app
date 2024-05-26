/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row, Toast } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { GetAssessmentResponse, addQuestions, getAssessment } from "../../../services";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "../../../store/ToastStore";
import { loader } from "../../../store/LoaderStore";
import { loginSession } from "../../../store";

type TChoices = {
  choiceId: number;
  choiceType: "A" | "B" | "C" | "D";
  choice: string;
  answer: boolean;
}

type TQuestions = {
  questionNumber: number;
  question: string;
  choices: TChoices[];
};

export const QuestionsCreate = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<TQuestions[]>([]);
  const [assessment, setAssessment] = useState<GetAssessmentResponse | null>(null);
  const getLoginSession = useAtomValue(loginSession);
  const setLoader = useSetAtom(loader);
  const getLoader = useAtomValue(loader);
  const setToast = useSetAtom(toast);
  const getToast = useAtomValue(toast);

  const addNewQuestion = (questionNumber: number): TQuestions => {
    return {
      questionNumber,
      question: "",
      choices: [
        {
          choiceId: 1,
          choiceType: "A",
          choice: "",
          answer: false
        },
        {
          choiceId: 2,
          choiceType: "B",
          choice: "",
          answer: false
        },
        {
          choiceId: 3,
          choiceType: "C",
          choice: "",
          answer: false
        },
        {
          choiceId: 4,
          choiceType: "D",
          choice: "",
          answer: false
        }
      ]
    }
  };

  const isReadyToPublish = (): boolean => {
    let ready = true;
    questions.forEach((value: TQuestions) => {
      if (value.question === "") {
        ready = false;
        return;
      }
      const filteredEmptyChoices = value.choices.filter((choices: TChoices) => {
        if (choices.choice !== "") {
          return choices.answer === false;
        }
        return choices.choice === "";
      });
      if (filteredEmptyChoices.length === value.choices.length) {
        ready = false;
      }
    });
    return ready;
  };

  const addNewQuestionClick = () => {
    const newQuestion = addNewQuestion(questions[questions.length-1].questionNumber + 1);
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  const removeQuestionClick = (questionNumber: number) => {
    let updatedQuestions: TQuestions[] = [];
    questions.forEach((value: TQuestions) => {
      if (value.questionNumber !== questionNumber) {
        updatedQuestions.push(value);
      }
    });
    const newQuestions = updatedQuestions.map((value: TQuestions, index: number) => {
      value.questionNumber = index + 1;
      return value;
    });
    setQuestions(newQuestions);
  };

  const fetchAssessment = async () => {
    try {
      const { data } = await getAssessment(Number(params["id"]));
      if (data.status === 200 && data.message === "Success") {
        const assessment = data.data[0];
        setAssessment(assessment);
      }
    } catch (error) {
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  const onPublishClick = async () => {
    setLoader({ show: true });
    try {
      const { data } = await addQuestions(
        assessment?.assessment_hash ?? "",
        assessment?.id ?? 0,
        getLoginSession.email,
        JSON.stringify(questions)
      );
      if (data.status === 200 && data.message === "Success") {
        setTimeout(() => {
          setLoader({ show: false });
          setToast({
            show: true,
            title: "Questions Published",
            description: "Assessment was published successfully"
          });
          setTimeout(() => {
            navigate("/instructor/assessments");
          }, 1500);
        }, 500);
      }
    } catch (error) {
      setLoader({ show: false });
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  useEffect(() => {
    setQuestions([addNewQuestion(1)]);
    fetchAssessment();
  }, []);

  return (
    <div className="min-h-screen full bg-[#F0F0F0] flex flex-col p-[20px] gap-[15px]">
      <Row>
        <Col lg={3}></Col>
        <Col lg={6} md={12} sm={12}>
          <div className="rounded-[10px] border-t-[5px] border-[#198754] py-[12px] px-[16px] bg-[#FFFFFF]">
            <h3 className="open-sans-700 text-[25px]">
              {/* This form is no longer accepting responses */}
              {assessment?.assessment_title}
            </h3>
            <p className="open-sans text-[#8c8c8c] mt-[8px]">
              {assessment?.assessment_description}
              {/* This quiz is used to test the IQ of my MF students. Passing score is 10/15 */}
              {/* Please contact your administrator / instructor if there are any issues regarding the status
              of this form */}
            </p>
            <div className="flex flex-row items-center gap-[20px] mt-[20px]">
              <Button
                disabled={!isReadyToPublish()}
                variant="outline-success"
                size="sm"
                onClick={onPublishClick}>
                <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp;&nbsp;Publish
              </Button>
              {getLoader.show && (
                <div className="spinner-border text-success" role="status"></div>
              )}
            </div>
          </div>
        </Col>
        <Col lg={3}></Col>
      </Row>
      {questions.map((value: TQuestions, index: number) => {
        return (
          <React.Fragment key={index}>
            <Row>
              <Col lg={3}></Col>
              <Col lg={6} md={12} sm={12}>
                <div className="rounded-[10px] py-[16px] px-[16px] bg-[#FFFFFF]">
                  <Badge bg="secondary open-sans-700 uppercase">
                    Add Question
                  </Badge>
                  <p className="open-sans text-[#8c8c8c] text-[14px] mt-[5px]">
                    Input question, add multiple choices, and provide the correct answer in the box field provided.
                    All of the choices are optional. Click on the circle button if the choice is the correct answer.
                  </p>
                  <div className="flex flex-col gap-[10px] mt-[20px]">
                    <textarea
                      className="form-control open-sans-500 text-[#000000] text-[17px]"
                      placeholder={`Question No. ${value.questionNumber}`}
                      value={value.question}
                      onChange={(event) => {
                        const newValue = event.currentTarget.value;
                        setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                          if (q.questionNumber === value.questionNumber) {
                            q.question = newValue
                          }
                          return q;
                        }));
                      }}
                      rows={1}></textarea>
                    <div className="flex flex-row gap-[10px] items-center">
                      <div className="flex-1 flex flex-row gap-[10px] items-center">
                        {value.choices[0].answer ? (
                          <Button variant="outline-success" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[0].answer = false;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-solid fa-circle-check"></i>
                          </Button>
                        ) : (
                          <Button variant="outline-secondary border-[#DEE2E6]" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[0].answer = true;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-regular fa-circle"></i>
                          </Button>
                        )}
                        <input
                          type="text"
                          className="form-control open-sans-600"
                          placeholder="A.)"
                          value={value.choices[0].choice}
                          onChange={(event) => {
                            const newValue = event.currentTarget.value;
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[0].choice = newValue
                              }
                              return q;
                            }));
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-row gap-[10px] items-center">
                        {value.choices[1].answer ? (
                          <Button variant="outline-success" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[1].answer = false;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-solid fa-circle-check"></i>
                          </Button>
                        ) : (
                          <Button variant="outline-secondary border-[#DEE2E6]" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[1].answer = true;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-regular fa-circle"></i>
                          </Button>
                        )}
                        <input
                          type="text"
                          className="form-control open-sans-600"
                          placeholder="B.)"
                          value={value.choices[1].choice}
                          onChange={(event) => {
                            const newValue = event.currentTarget.value;
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[1].choice = newValue
                              }
                              return q;
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-[10px]">
                      <div className="flex-1 flex flex-row gap-[10px] items-center">
                        {value.choices[2].answer ? (
                          <Button variant="outline-success" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[2].answer = false;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-solid fa-circle-check"></i>
                          </Button>
                        ) : (
                          <Button variant="outline-secondary border-[#DEE2E6]" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[2].answer = true;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-regular fa-circle"></i>
                          </Button>
                        )}
                        <input
                          type="text"
                          className="form-control open-sans-600"
                          placeholder="C.)"
                          value={value.choices[2].choice}
                          onChange={(event) => {
                            const newValue = event.currentTarget.value;
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[2].choice = newValue
                              }
                              return q;
                            }));
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-row gap-[10px] items-center">
                        {value.choices[3].answer ? (
                          <Button variant="outline-success" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[3].answer = false;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-solid fa-circle-check"></i>
                          </Button>
                        ) : (
                          <Button variant="outline-secondary border-[#DEE2E6]" onClick={() => {
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[3].answer = true;
                              }
                              return q;
                            }));
                          }}>
                            <i className="fa-regular fa-circle"></i>
                          </Button>
                        )}
                        <input
                          type="text"
                          className="form-control open-sans-600"
                          placeholder="D.)"
                          value={value.choices[3].choice}
                          onChange={(event) => {
                            const newValue = event.currentTarget.value;
                            setQuestions(prevQuestions => prevQuestions.map((q: TQuestions) => {
                              if (q.questionNumber === value.questionNumber) {
                                q.choices[3].choice = newValue
                              }
                              return q;
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-[10px] items-center mt-[12px]">
                      <h3 className="open-sans-500 flex-1">
                        Correct Answer(s):&nbsp;&nbsp;
                        <b>
                          {value.choices.filter((choice: TChoices) => choice.answer)
                            .map((choice) => choice.choiceType).join(", ")}
                        </b>
                      </h3>
                      <Button disabled={value.questionNumber === 1} variant="outline-secondary" size="sm"
                        onClick={() => removeQuestionClick(value.questionNumber)}>
                        <i className="fa-solid fa-circle-minus"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3}></Col>
            </Row>
          </React.Fragment>
        );
      })}
      <Row>
        <Col lg={3}></Col>
        <Col lg={6} md={12} sm={12}>
          <div className="pb-[20px]">
            <Button variant="success" className="w-full" onClick={addNewQuestionClick}>
              <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Add New Question
            </Button>
          </div>
        </Col>
        <Col lg={3}></Col>
      </Row>
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
    </div>
  );
};
