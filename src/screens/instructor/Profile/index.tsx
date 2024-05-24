/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Container } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <MainContainer
      title="Profile"
      profile={{
        name: "Norman Conche Palisoc",
        email: "myemail@gmail.com"
      }}
      sidebar={[
        {
          icon: <i className="fa-solid fa-gauge"></i>,
          label: "Dashboard",
          selected: false,
          onClick: () => {
            navigate("/instructor/dashboard");
          }
        },
        {
          icon: <i className="fa-solid fa-book"></i>,
          label: "Subjects",
          selected: false,
          onClick: () => {
            navigate("/instructor/subjects");
          }
        },
        {
          icon: <i className="fa-solid fa-circle-user"></i>,
          label: "Profile",
          selected: true,
          onClick: () => {
            navigate("/instructor/profile");
          }
        },
        {
          icon: <i className="fa-solid fa-right-from-bracket"></i>,
          label: "Logout",
          selected: false,
          onClick: () => {
            navigate("/instructor/logout");
          }
        }
      ]}>
      <Container>
        <div></div>
      </Container>
    </MainContainer>
  );
};
