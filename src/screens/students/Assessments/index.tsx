/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Col, Row, Toast } from "react-bootstrap";
import { GetAssessmentResponse, getAssessment } from "../../../services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { toast } from "../../../store/ToastStore";
import { verifyAssessment } from "../../../services/StudentApi";

export const Assessment = (): JSX.Element => {
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
            Number(assessment.subject_id)
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
    subjectId: number
  ) => {
    try {
      const { data } = await verifyAssessment(
        assessmentId.toString(),
        subjectId.toString(),
        sessionStorage.getItem("student.studentId") ?? ""
      );
      if (data.status === 200 && data.message === "Success") {
        setIsDenied(false);
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
                  <>{
                      "Unabel to access this form. This might be that the owner is not accepting any responses " +
                      "or you are not granted an access to view this form. Please contact your administrator / " +
                      "instructor if there are any issues regarding the status of this form "
                    }</>
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
