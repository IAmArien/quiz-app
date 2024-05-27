/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { MainContainer } from "../../../components";

export const Dashboard = (): JSX.Element => {

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
        }
      ]}>
      <div></div>
    </MainContainer>
  )
};
