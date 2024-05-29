/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../components";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const firstName = sessionStorage.getItem("student.firstname");
  const lastName = sessionStorage.getItem("student.lastname");

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
          count: 6,
          selected: false,
          onClick: () => {
            
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
      <div></div>
    </MainContainer>
  );
};
