/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Container } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";

export const Assessments = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <MainContainer
      title="Assessments"
      profile={{
        name: "Norman Palisoc"
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
          icon: <i className="fa-regular fa-bars-progress"></i>,
          label: "Assessments",
          selected: true,
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
