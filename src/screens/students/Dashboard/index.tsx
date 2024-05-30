/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../components";
import { useEffect, useState } from "react";
import { getSubjects } from "../../../services/StudentApi";
import { Col, Row } from "react-bootstrap";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [assessmentsCount, setAssessmentsCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const firstName = sessionStorage.getItem("student.firstname");
  const lastName = sessionStorage.getItem("student.lastname");

  const fetchSubjects = async () => {
    try {
      const studentId = sessionStorage.getItem("student.studentId") ?? "";
      const { data } = await getSubjects(studentId);
      if (data.status === 200 && data.message === "Success") {
        let assessmentCount = 0;
        setSubjectCount(data.data.length);
        data.data.forEach((value) => {
          assessmentCount += value.assessments_data.length;
        });
        setAssessmentsCount(assessmentCount);
      } else {
        setSubjectCount(0);
      }
    } catch (error) {
      console.error(error);
      setSubjectCount(0);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <MainContainer
      title="Dashboard"
      profile={{ name: `${firstName} ${lastName}` }}
      sidebar={[
        {
          icon: <i className="fa-solid fa-gauge"></i>,
          label: "Dashboard",
          selected: true,
          onClick: () => {
            navigate("/students/dashboard");
          }
        },
        {
          icon: <i className="fa-solid fa-book"></i>,
          label: "Subjects",
          count: subjectCount,
          selected: false,
          onClick: () => {
            navigate("/students/subjects");
          }
        },
        {
          icon: <i className="fa-solid fa-circle-user"></i>,
          label: "Profile",
          selected: false,
          onClick: () => {
            navigate("/students/profile");
          }
        },
        {
          icon: <i className="fa-solid fa-right-from-bracket"></i>,
          label: "Logout",
          selected: false,
          onClick: () => {
            sessionStorage.removeItem("student.firstname");
            sessionStorage.removeItem("student.lastname");
            sessionStorage.removeItem("student.studentId");
            sessionStorage.removeItem("student.email");
            sessionStorage.removeItem("student.college");
            navigate("/students");
          }
        },
      ]}>
      <div className="flex flex-col pt-[30px] pr-[20px]">
        <Row>
          <Col lg={4} md={6} sm={12}>
            <div className="flex flex-row shadow rounded-[7px]">
              <div className="bg-[#198754] rounded-tl-[7px] rounded-bl-[7px] w-[80px] h-[70px] flex flex-col items-center justify-center">
                <h3 className="text-[#FFFFFF] text-[20px] open-sans-700">{subjectCount}</h3>
              </div>
              <div className="flex-1 flex flex-col gap-[4px] pl-[12px] justify-center">
                <h3 className="open-sans-600">Subjects</h3>
                <p className="text-[13px] text-[#8c8c8c] open-sans">Currently subjects enrolled</p>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <div className="flex flex-row shadow rounded-[7px]">
              <div className="bg-[#0d6efd] rounded-tl-[7px] rounded-bl-[7px] w-[80px] h-[70px] flex flex-col items-center justify-center">
                <h3 className="text-[#FFFFFF] text-[20px] open-sans-700">{assessmentsCount}</h3>
              </div>
              <div className="flex-1 flex flex-col gap-[4px] pl-[12px] justify-center">
                <h3 className="open-sans-600">Assessments</h3>
                <p className="text-[13px] text-[#8c8c8c] open-sans">Currently active assessments</p>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12}>
          </Col>
        </Row>
      </div>
    </MainContainer>
  );
};
