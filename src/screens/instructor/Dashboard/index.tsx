/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Container } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { loginSession } from "../../../store";
import { useEffect, useState } from "react";
import { getAssessments, getSubjects } from "../../../services/InstructorApi";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const setLoginSession = useSetAtom(loginSession);
  const firstName = sessionStorage.getItem("instructor.firstname");
  const lastName = sessionStorage.getItem("instructor.lastname");

  const [assessmentCount, setAssessmentCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);

  const fetchSubjects = async () => {
    try {
      const email = sessionStorage.getItem("instructor.email") ?? "";
      const { data } = await getSubjects(email);
      if (data.status === 200 && data.message === "Success") {
        setSubjectCount(data.data.length);
      } else {
        setSubjectCount(0);
      }
    } catch (error) {
      setSubjectCount(0);
    }
  };

  const fetchAssessments = async () => {
    try {
      const email = sessionStorage.getItem("instructor.email") ?? "";
      const { data } = await getAssessments(email);
      if (data.status === 200 && data.message === "Success") {
        setAssessmentCount(data.data.length);
      } else {
        setAssessmentCount(0);
      }
    } catch (error) {
      setAssessmentCount(0);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchAssessments();
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
            navigate("/instructor/dashboard");
          }
        },
        {
          icon: <i className="fa-solid fa-book"></i>,
          label: "Subjects",
          count: subjectCount,
          selected: false,
          onClick: () => {
            navigate("/instructor/subjects");
          }
        },
        {
          icon: <i className="fa-solid fa-bars-progress"></i>,
          label: "Assessments",
          count: assessmentCount,
          selected: false,
          onClick: () => {
            navigate("/instructor/assessments");
          }
        },
        {
          icon: <i className="fa-solid fa-circle-user"></i>,
          label: "Profile",
          selected: false,
          onClick: () => {
            navigate("/instructor/profile");
          }
        },
        {
          icon: <i className="fa-solid fa-right-from-bracket"></i>,
          label: "Logout",
          selected: false,
          onClick: () => {
            sessionStorage.removeItem("instructor.firstname");
            sessionStorage.removeItem("instructor.lastname");
            sessionStorage.removeItem("instructor.email");
            sessionStorage.removeItem("instructor.college");
            setLoginSession({
              login: false,
              email: "",
              first_name: "",
              last_name: "",
              college: ""
            });
            navigate("/instructor");
          }
        }
      ]}>
      <Container>
        <div></div>
      </Container>
    </MainContainer>
  );
};
