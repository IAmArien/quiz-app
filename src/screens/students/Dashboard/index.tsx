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
          icon: <></>,
          label: "Dashboard",
          selected: true,
          onClick: () => {

          }
        },
        {
          icon: <></>,
          label: "Subjects",
          count: 6,
          selected: false,
          onClick: () => {
            
          }
        },
        {
          icon: <></>,
          label: "Profile",
          selected: false,
          onClick: () => {
            
          }
        },
        {
          icon: <></>,
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
  )
};
