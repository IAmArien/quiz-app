/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useState } from "react";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { register } from "../../../services/StudentApi";
import { merge } from "../../../utils";
import { toast } from "../../../store/ToastStore";
import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const setToast = useSetAtom(toast);
  const getToast = useAtomValue(toast);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await register(
        firstName,
        lastName,
        studentId,
        department,
        emailAddress,
        confirmPassword
      );
      if (data.status === 200 && data.message === "Success") {
        setIsError(false);
        sessionStorage.setItem("student.firstname", data.data.first_name);
        sessionStorage.setItem("student.lastname", data.data.last_name);
        sessionStorage.setItem("student.email", data.data.email);
        sessionStorage.setItem("student.studentId", data.data.student_id ?? "");
        sessionStorage.setItem("student.college", data.data.college);
        setFirstName("");
        setLastName("");
        setDepartment("");
        setStudentId("");
        setEmailAddress("");
        setPassword("");
        setConfirmPassword("");
        setToast({
          show: false,
          title: "",
          description: ""
        });
        setTimeout(() => {
          navigate("/students/dashboard");
        }, 750);
      } else {
        setIsError(true);
        setToast({
          show: true,
          title: "Error Encountered",
          description: "Something went wrong while action is being done"
        });
      }
    } catch (error) {
      setIsError(true);
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full flex flex-col justify-center bg-[#F0F0F0]">
        <Container>
          <Row>
            <Col lg={3} md={3} sm={0}></Col>
            <Col lg={6} md={6} sm={12}>
              <div className="bg-[#FFFFFF] rounded-[10px] p-[20px]">
                <h3 className="text-center text-[25px] open-sans">
                  Create a <b className="text-[#198754]">Student</b> account
                </h3>
                <p className="text-center text-[#8c8c8c] text-[15px] open-sans mt-[8px]">
                  Please fill up all the fields to create an account.
                </p>
                <Form onSubmit={handleOnSubmit} className="mt-[30px]">
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-row gap-[10px]">
                      <input
                        type="text"
                        name="firstname"
                        className={merge("form-control open-sans", {
                          "border-[red]": isError
                        })}
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(event) => {
                          setFirstName(event.currentTarget.value);
                          setIsError(false);
                        }}
                      />
                      <input
                        type="text"
                        name="lastname"
                        className={merge("form-control open-sans", {
                          "border-[red]": isError
                        })}
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(event) => {
                          setLastName(event.currentTarget.value);
                          setIsError(false);
                        }}
                      />
                    </div>
                    <input
                      type="text"
                      name="student_id"
                      className={merge("form-control open-sans", {
                        "border-[red]": isError
                      })}
                      placeholder="Student ID"
                      required
                      value={studentId}
                      onChange={(event) => {
                        setStudentId(event.currentTarget.value);
                        setIsError(false);
                      }}
                    />
                    <input
                      type="text"
                      name="department"
                      className={merge("form-control open-sans", {
                        "border-[red]": isError
                      })}
                      placeholder="Department / College"
                      required
                      value={department}
                      onChange={(event) => {
                        setDepartment(event.currentTarget.value);
                        setIsError(false);
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      className={merge("form-control open-sans", {
                        "border-[red]": isError
                      })}
                      placeholder="Email Address"
                      required
                      value={emailAddress}
                      onChange={(event) => {
                        setEmailAddress(event.currentTarget.value);
                        setIsError(false);
                      }}
                    />
                    <input
                      type="password"
                      name="password"
                      className={merge("form-control open-sans", {
                        "border-[red]": isError
                      })}
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(event) => {
                        setPassword(event.currentTarget.value);
                        setIsError(false);
                      }}
                    />
                    <input
                      type="password"
                      name="password"
                      className={merge("form-control open-sans", {
                        "border-[red]": isError
                      })}
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.currentTarget.value);
                        setIsError(false);
                      }}
                    />
                    <Button className="open-sans-600" type="submit" variant="success">
                      Create an account
                    </Button>
                    <p className="mt-[20px] text-center open-sans">
                      Already have an account yet?
                      Login <a className="text-[#0b5ed7]" href="/students">here</a>.
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
            <Col lg={3} md={3} sm={3}></Col>
          </Row>
        </Container>
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
