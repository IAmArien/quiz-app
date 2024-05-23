/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export const Login = (): JSX.Element => {

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full flex flex-col justify-center bg-[#F0F0F0]">
      <Container>
        <Row>
          <Col lg={4} md={3} sm={0}></Col>
          <Col lg={4} md={6} sm={12}>
            <div className="bg-[#FFFFFF] rounded-[10px] p-[20px]">
              <h3 className="text-center text-[25px] open-sans">
                Login as <b className="text-[#198754]">Instructor</b>
              </h3>
              <p className="text-center text-[#8c8c8c] text-[15px] open-sans mt-[8px]">
                Please input valid credentials to login.
              </p>
              <Form onSubmit={handleOnSubmit} className="mt-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <input
                    type="email"
                    name="email"
                    className="form-control open-sans"
                    placeholder="Email Address"
                    required
                    value={emailAddress}
                    onChange={(event) => {
                      setEmailAddress(event.currentTarget.value);
                    }}
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-control open-sans"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                    }}
                  />
                  <Button className="open-sans-600" type="submit" variant="success">
                    Login
                  </Button>
                  <p className="mt-[20px] text-center open-sans">
                    Don't have an account yet?
                    Register <a className="text-[#0b5ed7]" href="/instructor/register">here</a>.
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
