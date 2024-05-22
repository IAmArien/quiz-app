/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Col, Container, Row } from "react-bootstrap";

export const Login = (): JSX.Element => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full flex flex-col justify-center bg-[#F0F0F0]">
      <Container>
        <Row>
          <Col lg={4} md={3} sm={0}></Col>
          <Col lg={4} md={6} sm={12}>
            <div className="bg-[#FFFFFF] rounded-[10px] p-[20px]">
              <h3 className="text-base text-center">Login for Instructor</h3>
            </div>
          </Col>
          <Col lg={4} md={3} sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};
