/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { merge } from "../../../utils";
import { login } from "../../../services/StudentApi";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } =  await login(emailAddress, password);
    if (data.status === 200 && data.message === "Success") {
      sessionStorage.setItem("student.firstname", data.data.first_name);
      sessionStorage.setItem("student.lastname", data.data.last_name);
      sessionStorage.setItem("student.email", data.data.email);
      sessionStorage.setItem("student.studentId", data.data.student_id ?? "");
      sessionStorage.setItem("student.college", data.data.college);
      navigate("/students/dashboard");
    } else {
      setEmailAddress("");
      setPassword("");
      setIsError(true);
    }
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full flex flex-col justify-center bg-[#F0F0F0]">
      <Container>
        <Row>
          <Col lg={4} md={3} sm={0}></Col>
          <Col lg={4} md={6} sm={12}>
            <div className="bg-[#FFFFFF] rounded-[10px] p-[20px]">
              <h3 className="text-center text-[25px] open-sans">
                Login as <b className="text-[#198754]">Student</b>
              </h3>
              <p className="text-center text-[#8c8c8c] text-[15px] open-sans mt-[8px]">
                Please input valid credentials to login.
              </p>
              <Form onSubmit={handleOnSubmit} className="mt-[30px]">
                <div className="flex flex-col gap-[10px]">
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
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                      setIsError(false);
                    }}
                  />
                  {isError && (
                    <p className="text-[red] text-[13px] open-sans-500">
                      Invalid email or password.
                    </p>
                  )}
                  <Button className="open-sans-600" type="submit" variant="success">
                    Login
                  </Button>
                  <p className="mt-[20px] text-center open-sans">
                    Don't have an account yet?
                    Register <a className="text-[#0b5ed7]" href="/students/register">here</a>.
                  </p>
                </div>
              </Form>
            </div>
          </Col>
          <Col lg={4} md={3} sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};
