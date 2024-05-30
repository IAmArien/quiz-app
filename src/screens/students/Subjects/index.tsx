/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../components";
import { Badge, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSSObject } from "styled-components";
import { getSubjects } from "../../../services/StudentApi";
import { GetStudentSubjectResponse } from "../../../services";
import { HOST_URL } from "../../../utils/constants";
import { useSetAtom } from "jotai";
import { toast } from "../../../store/ToastStore";

type TDataTableSubjectsAssessmentsData = {
  assessment_id: string;
  assessment_title: string;
  assessment_subject_id: string;
  assessment_status: string;
  assessment_hash: string;
  instructor_email: string;
};

type TDataTableSubjectsData = {
  id: number;
  subjectId: number;
  subject: string;
  section: string;
  description: string;
  assessments: string;
  assessments_data: TDataTableSubjectsAssessmentsData[];
};

export const Subjects = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<TDataTableSubjectsData | null>(null);
  const [data, setData] = useState<TDataTableSubjectsData[]>([]);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [subjectCount, setSubjectCount] = useState(0);
  const setToast = useSetAtom(toast);

  const firstName = sessionStorage.getItem("student.firstname");
  const lastName = sessionStorage.getItem("student.lastname");

  const columns = [
    {
      name: 'Subject (Title)',
      selector: (row: TDataTableSubjectsData) => row.subject,
      sortable: true,
      cell: (row: TDataTableSubjectsData) => (
        <p className="open-sans-600 text-[15px]">
          {row.subject}
        </p>
      )
    },
    {
      name: 'Section',
      selector: (row: TDataTableSubjectsData) => row.section,
      sortable: true,
      cell: (row: TDataTableSubjectsData) => (
        <p className="open-sans-600 text-[15px]">
          {row.section}
        </p>
      )
    },
    {
      name: 'Subject (Description)',
      selector: (row: TDataTableSubjectsData) => row.description,
      sortable: true,
      cell: (row: any) => (
        <div className="flex flex-row gap-[12px] items-center pr-[50px]">
          <p className="open-sans text-[#8c8c8c] text-[15px]">
            {row.description}
          </p>
        </div>
      )
    },
    {
      name: 'Active Assessments',
      selector: (row: TDataTableSubjectsData) => row.assessments,
      sortable: true,
      cell: (row: any) => (
        <div className="flex flex-row gap-[12px] items-center pr-[50px]">
          <Badge bg="success" className="open-sans-700 uppercase">
            {row.assessments}
          </Badge>
        </div>
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: (row: TDataTableSubjectsData) => (
        <div className="flex flex-row gap-[5px]">
          <Button variant="outline-success" size="sm" onClick={() => {
            setShowAssessmentModal(true);
            setSelectedSubject(row);
          }}>
            <i className="fa-solid fa-eye"></i>&nbsp;&nbsp;View Assessments
          </Button>
        </div>
      )
    }
  ];

  const fetchSubjects = async () => {
    try {
      const studentId = sessionStorage.getItem("student.studentId") ?? "";
      const { data } = await getSubjects(studentId);
      if (data.status === 200 && data.message === "Success") {
        const newData = data.data.map((value: GetStudentSubjectResponse, index: number) => {
          return {
            id: index + 1,
            subjectId: value.subject_id,
            subject: value.subject_title,
            section: value.section,
            description: value.subject_description,
            assessments: value.assessments,
            assessments_data: value.assessments_data
          }
        });
        setData(newData);
        setSubjectCount(newData.length);
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
        title="Dashboard"
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
            selected: true,
            onClick: () => {
              navigate("/students/subjects");
            }
          },
          {
            icon: <i className="fa-solid fa-circle-user"></i>,
            label: "Profile",
            selected: false,
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
        <div className="flex flex-col pt-[20px]">
          <DataTable
            title="Assigned Subjects"
            striped
            selectableRows={false}
            dense={false}
            highlightOnHover
            pagination
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
      </MainContainer>
      <Modal show={showAssessmentModal} centered onHide={() => setShowAssessmentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="open-sans-600">Assessment Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[17px]">
            <p className="open-sans">
              Copy this assessment link to view the questions published
            </p>
            <div className="flex flex-col gap-[7px]">
              {selectedSubject?.assessments_data.map((value: TDataTableSubjectsAssessmentsData) => {
                const assessmentLink = `${HOST_URL}/${value?.assessment_hash}/${value?.assessment_id}`;
                return (
                  <div className="flex flex-row gap-[6px]">
                    <input
                      type="text"
                      name="assessment_link"
                      className="form-control open-sans-600 text-[#0d6efd]"
                      placeholder="Assessment Link"
                      required
                      value={assessmentLink}
                      readOnly
                    />
                    <Button variant="success" onClick={() => {
                      navigate(`/students/assessment/${value.assessment_hash}/${value.assessment_id}`)
                    }}>
                      <i className="fa-solid fa-arrow-right"></i>
                    </Button>
                    <Button variant="secondary" onClick={() => {
                      navigator.clipboard.writeText(assessmentLink);
                      setShowAssessmentModal(false);
                      setToast({
                        show: true,
                        title: "Link Copied",
                        description: `${assessmentLink} was copied to clipboard`
                      });
                    }}>
                      <i className="fa-solid fa-clipboard"></i>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="open-sans-600"
            variant="secondary"
            onClick={() => setShowAssessmentModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
