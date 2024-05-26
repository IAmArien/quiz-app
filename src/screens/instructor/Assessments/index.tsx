/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Badge, Button, Container, Modal } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { CSSObject } from "styled-components";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { loginSession } from "../../../store";
import { useAtomValue, useSetAtom } from "jotai";
import { loader } from "../../../store/LoaderStore";
import { toast } from "../../../store/ToastStore";
import { GetSubjectResponse, addAssessment, getSubjects } from "../../../services";

type TDataTableAssessmentData = {
  id: number | string;
  assessmentId: number;
  assessmentName: string;
  section: string;
  status: "ACTIVE" | "INACTIVE";
  result: string;
  passing: string;
}

type TSubjectListSelection = {
  subjectId: number;
  subject: string;
  section: string;
  description: string;
}

export const Assessments = (): JSX.Element => {
  const navigate = useNavigate();
  const getLoginSession = useAtomValue(loginSession);
  const setLoader = useSetAtom(loader);
  const setToast = useSetAtom(toast);
  const [showAddAssessmentModal, setShowAddAssessmentModal] = useState(false);
  const [data, setData] = useState<TDataTableAssessmentData[]>([]);
  const [subjectList, setSubjectList] = useState<TSubjectListSelection[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(0);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDesc, setAssessmentDesc] = useState("");

  const name = `${getLoginSession.first_name} ${getLoginSession.last_name}`;

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
  ];

  const fetchSubjects = async () => {
    try {
      const { data } = await getSubjects(getLoginSession.email);
      if (data.status === 200 && data.message === "Success") {
        const subjects = data.data.map((value: GetSubjectResponse, index: number) => {
          return {
            subjectId: value.id,
            subject: value.subject_title,
            section: value.section,
            description: value.subject_description
          }
        });
        setSelectedSubjectId(subjects[0].subjectId);
        setSubjectList(subjects);
      }
    } catch (error) {
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

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
    ]);
    fetchSubjects();
  }, []);

  const handleOnSubmitAssessment = async () => {
    setShowAddAssessmentModal(false);
    setLoader({ show: true });
    try {
      const { data } = await addAssessment(
        assessmentTitle,
        assessmentDesc,
        selectedSubjectId,
        getLoginSession.email
      );
      if (data.status === 200 && data.message === "Success") {
        setAssessmentTitle("");
        setAssessmentDesc("");
        setTimeout(() => {
          setLoader({ show: false });
          setToast({
            show: true,
            title: "Added Assessment",
            description: "Assessment was added successfully"
          });
        }, 500);
      }   
    } catch (error) {
      setTimeout(() => {
        setLoader({ show: false });
        setToast({
          show: true,
          title: "Error Encountered",
          description: "Something went wrong while action is being done"
        });
      }, 500);
    }
  };

  const customAction = (): JSX.Element => {
    return (
      <Button className="open-sans" variant="outline-success" size="sm" onClick={() => {
        setShowAddAssessmentModal(true);
      }}>
        <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;
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
        profile={{ name }}
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
            count: 6,
            onClick: () => {
              navigate("/instructor/subjects");
            }
          },
          {
            icon: <i className="fa-regular fa-bars-progress"></i>,
            label: "Assessments",
            selected: true,
            count: 2,
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
              striped
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
            <textarea
              rows={4}
              name="description"
              className="form-control open-sans"
              placeholder="Assessment (Description)"
              required
              value={assessmentDesc}
              onChange={(event) => {
                setAssessmentDesc(event.currentTarget.value)
              }}></textarea>
            <select
              className="form-select open-sans"
              name="assessment_section"
              onChange={(event) => {
                const current = Number(event.currentTarget.value);
                setSelectedSubjectId(current);
              }}>
              {subjectList.map((value: TSubjectListSelection, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <option value={value.subjectId}>{value.subject} - {value.section}</option>
                  </React.Fragment>
                );
              })}
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
