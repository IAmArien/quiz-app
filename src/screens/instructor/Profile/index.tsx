/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckBoxIcon } from "../../../assets/icons/CheckBoxIcon";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPasword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <MainContainer
      title="Profile"
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
          selected: false,
          onClick: () => {
            navigate("/instructor/assessments");
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
        <div>
          <Row>
            <Col lg={6} md={12} sm={12}>
              <div className="bg-[#FFFFFF] rounded-[10px] pt-[30px]">
                <h3 className="text-[25px] open-sans">
                  Update your Instructor account
                </h3>
                <p className="text-[#8c8c8c] text-[15px] open-sans mt-[8px]">
                  Please fill up all the required fields to update your account.
                </p>
                <Form onSubmit={handleOnSubmit} className="mt-[30px]">
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-row gap-[10px]">
                      <input
                        type="text"
                        name="firstname"
                        className="form-control open-sans"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(event) => {
                          setFirstName(event.currentTarget.value);
                        }}
                      />
                      <input
                        type="text"
                        name="lastname"
                        className="form-control open-sans"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(event) => {
                          setLastName(event.currentTarget.value);
                        }}
                      />
                    </div>
                    <input
                      type="text"
                      name="department"
                      className="form-control open-sans"
                      placeholder="Department / College"
                      required
                      value={department}
                      onChange={(event) => {
                        setDepartment(event.currentTarget.value);
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      className="form-control open-sans"
                      placeholder="Email Address"
                      required
                      disabled
                      value={emailAddress}
                      onChange={(event) => {
                        setEmailAddress(event.currentTarget.value);
                      }}
                    />
                    <div className="flex flex-row gap-[10px] items-center mt-[20px] mb-[6px] cursor-pointer"
                      onClick={() => setUpdatePassword(!updatePassword)}>
                      <CheckBoxIcon checked={updatePassword} />
                      <h3 className="open-sans-600 text-[15px]">
                        Update Password?
                      </h3>
                    </div>
                    <input
                      type="password"
                      name="current_password"
                      className="form-control open-sans"
                      placeholder="Current Password"
                      required
                      disabled={!updatePassword}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.currentTarget.value);
                      }}
                    />
                    <input
                      type="password"
                      name="new_password"
                      className="form-control open-sans"
                      placeholder="New Password"
                      required
                      disabled={!updatePassword}
                      value={newPasword}
                      onChange={(event) => {
                        setNewPassword(event.currentTarget.value);
                      }}
                    />
                    <input
                      type="password"
                      name="password"
                      className="form-control open-sans"
                      placeholder="Confirm Password"
                      required
                      disabled={!updatePassword}
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.currentTarget.value);
                      }}
                    />
                    <Button className="open-sans-600" type="submit" variant="success">
                      Update Profile
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </MainContainer>
  );
};
