/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Badge, Button, Container, Modal } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { CSSObject } from "styled-components";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";

type TDataTableAssessmentData = {
  id: number | string;
  assessmentId: number;
  assessmentName: string;
  section: string;
  status: "ACTIVE" | "INACTIVE";
  result: string;
  passing: string;
}

export const Assessments = (): JSX.Element => {
  const navigate = useNavigate();
  const [showAddAssessmentModal, setShowAddAssessmentModal] = useState(false);
  const [data, setData] = useState<TDataTableAssessmentData[]>([]);
  const [assessmentTitle, setAssessmentTitle] = useState("");

  const columns = [
    {
      name: 'Assessment',
      selector: (row: TDataTableAssessmentData) => row.assessmentName,
      sortable: true,
      cell: (row: TDataTableAssessmentData) => (
        <p className="open-sans-600 text-[15px]">
          {row.assessmentName}
        </p>
      )
    },
    {
      name: 'Section',
      selector: (row: TDataTableAssessmentData) => row.section,
      sortable: true,
      cell: (row: TDataTableAssessmentData) => (
        <p className="open-sans text-[15px]">
          {row.section}
        </p>
      )
    },
    {
      name: 'Status',
      selector: (row: TDataTableAssessmentData) => row.status,
      sortable: true,
      cell: (row: TDataTableAssessmentData) => (
        <p className="open-sans-600 text-[15px]">
          <Badge bg={row.status === "ACTIVE" ? "success" : "secondary"}>
            {row.status}
          </Badge>
        </p>
      )
    },
    {
      name: 'Result',
      selector: (row: TDataTableAssessmentData) => row.result,
      sortable: true,
      cell: (row: TDataTableAssessmentData) => (
        <p className="open-sans text-[15px]">
          {row.result}
        </p>
      )
    },
    {
      name: 'Passing',
      selector: (row: TDataTableAssessmentData) => row.passing,
      sortable: true,
      cell: (row: TDataTableAssessmentData) => (
        <p className="open-sans text-[15px]">
          {row.passing}
        </p>
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: (row: TDataTableAssessmentData) => (
        <div className="flex flex-row gap-[5px]">
          <Button variant="success" size="sm" onClick={() => { }}>
            <i className="fa-solid fa-eye"></i>
          </Button>
          <Button disabled={row.status === "ACTIVE"} variant="danger" size="sm">
            <i className="fa-regular fa-trash-can"></i>
          </Button>
          <Button variant="primary" size="sm">
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
          <Button variant="secondary" size="sm">
            <i className="fa-solid fa-file-export"></i>
          </Button>
        </div>
      )
    }
  ]

  useEffect(() => {
    setData([
      {
        id: 1,
        assessmentId: 1,
        assessmentName: "Mathematics Quiz I",
        section: "Mathematics - Section I",
        status: "ACTIVE",
        result: "23 / 25 Taken the quiz",
        passing: "59% PASSED"
      },
      {
        id: 2,
        assessmentId: 2,
        assessmentName: "English III Quiz IV",
        section: "English III - Section II",
        status: "INACTIVE",
        result: "23 / 25 Taken the quiz",
        passing: "40% PASSED"
      },
    ])
  }, []);

  const handleOnSubmitAssessment = () => {};

  const customAction = (): JSX.Element => {
    return (
      <Button className="open-sans" variant="outline-success" size="sm" onClick={() => {
        setShowAddAssessmentModal(true);
      }}>
        <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;
        Add New Assessment
      </Button>
    );
  };

  const headCellStyle: CSSObject = {
    fontSize: 15,
    fontFamily: '"Open Sans", sans-serif',
    fontOpticalSizing: "auto",
    fontWeight: 700,
    fontStyle: "normal",
  };

  return (
    <>
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
          <div className="flex flex-col pt-[20px]">
            <DataTable
              title="Assessments Management"
              selectableRows={false}
              dense={false}
              highlightOnHover
              pagination
              actions={customAction()}
              className="open-sans-600"
              customStyles={{
                headCells: {
                  style: headCellStyle
                }
              }}
              columns={columns}
              data={data}
            />
          </div>
        </Container>
      </MainContainer>
      <Modal show={showAddAssessmentModal} centered onHide={() =>  setShowAddAssessmentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="open-sans-600">Add New Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[12px]">
            <input
              type="text"
              name="assessment"
              className="form-control open-sans"
              placeholder="Assessment (Title)"
              required
              value={assessmentTitle}
              onChange={(event) => {
                setAssessmentTitle(event.currentTarget.value);
              }}
            />
            <select className="form-select open-sans" name="assessment_section">
              <option value={"1-1"}>Mathematics - Section I</option>
              <option value={"3-2"}>English III - Section II</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="open-sans-600"
            variant="secondary"
            onClick={() => setShowAddAssessmentModal(false)}>
            Close
          </Button>
          <Button
            className="open-sans-600"
            variant="success"
            type="submit"
            onClick={handleOnSubmitAssessment}>
            Add Assessment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
