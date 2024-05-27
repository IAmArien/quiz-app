/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Col, Row } from "react-bootstrap";
import { GetAssessmentResponse } from "../../../services";
import { useState } from "react";

export const Assessment = (): JSX.Element => {
  const [assessment, setAssessment] = useState<GetAssessmentResponse | null>(null);
  return (
    <div className="min-h-screen full bg-[#F0F0F0] flex flex-col p-[20px] gap-[15px]">
      <Row>
        <Col lg={3}></Col>
        <Col lg={6} md={12} sm={12}>
          <div className="rounded-[10px] border-t-[5px] border-[#198754] py-[12px] px-[16px] bg-[#FFFFFF]">
            <h3 className="open-sans-700 text-[25px]">
              This form is no longer accepting responses
              {assessment?.assessment_title}
            </h3>
            <p className="open-sans text-[#8c8c8c] mt-[8px]">
              {assessment?.assessment_description}
              {/* This quiz is used to test the IQ of my MF students. Passing score is 10/15 */}
              Please contact your administrator / instructor if there are any issues regarding the status
              of this form
            </p>
          </div>
        </Col>
        <Col lg={3}></Col>
      </Row>
    </div>
  );
};
