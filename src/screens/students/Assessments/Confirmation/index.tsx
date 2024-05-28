/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GetAssessmentResponse, getAssessment } from "../../../../services";
import { verifyAssessment } from "../../../../services/StudentApi";
import { useAtom } from "jotai";
import { toast } from "../../../../store/ToastStore";
import { useNavigate, useParams } from "react-router-dom";
import { merge } from "../../../../utils";

export const AssessmentConfirmation = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const [assessment, setAssessment] = useState<GetAssessmentResponse | null>(null);
  const [isDenied, setIsDenied] = useState(false);
  const [getToast, setToast] = useAtom(toast);

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
              <h3 className={merge("open-sans-600 text-[#198754] text-[16px] mt-[20px] pb-[10px]", {
                "text-[red]": false
              })}>
                Test Score: <b>3/5</b>&nbsp;<b>PASSED</b>
              </h3>
            </div>
          </Col>
          <Col lg={3}></Col>
        </Row>
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
