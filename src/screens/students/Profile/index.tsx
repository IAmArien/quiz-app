/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckBoxIcon } from "../../../assets/icons/CheckBoxIcon";
import { loginSession } from "../../../store";
import { useAtom } from "jotai";
import { getSubjects } from "../../../services/StudentApi";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const [getLoginSession, setLoginSession] = useAtom(loginSession);
  const [firstName, setFirstName] = useState(
    sessionStorage.getItem("student.firstname") ?? ""
  );
  const [lastName, setLastName] = useState(
    sessionStorage.getItem("student.lastname") ?? ""
  );
  const [studentId, setStudentId] = useState(
    sessionStorage.getItem("student.studentId") ?? ""
  );
  const [department, setDepartment] = useState(
    sessionStorage.getItem("student.college") ?? ""
  );
  const [emailAddress, setEmailAddress] = useState(
    sessionStorage.getItem("student.email") ?? ""
  );
  const [updatePassword, setUpdatePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPasword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subjectCount, setSubjectCount] = useState(0);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const fetchSubjects = async () => {
    try {
      const studentId = sessionStorage.getItem("student.studentId") ?? "";
      const { data } = await getSubjects(studentId);
      if (data.status === 200 && data.message === "Success") {
        setSubjectCount(data.data.length);
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
      title="Profile"
      profile={{ name: `${firstName} ${lastName}` }}
      sidebar={[
        {
          icon: <i className="fa-solid fa-gauge"></i>,
          label: "Dashboard",
          selected: false,
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
          selected: true,
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
      <Container>
        <div>
          <Row>
            <Col lg={6} md={12} sm={12}>
              <div className="bg-[#FFFFFF] rounded-[10px] pt-[30px]">
                <h3 className="text-[25px] open-sans">
                  Update your Student account
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
                      name="student_id"
                      className="form-control open-sans"
                      placeholder="Student ID"
                      required
                      value={studentId}
                      onChange={(event) => {
                        setStudentId(event.currentTarget.value);
                      }}
                    />
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
