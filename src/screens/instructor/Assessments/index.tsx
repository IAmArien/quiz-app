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
import { useAtom, useSetAtom } from "jotai";
import { loader } from "../../../store/LoaderStore";
import { toast } from "../../../store/ToastStore";
import { GetAssessmentResponse, GetSubjectResponse, addAssessment, getAssessments, getSubjects } from "../../../services";
import { BASE_URL, HOST_URL } from "../../../utils/constants";

type TDataTableAssessmentData = {
  id: number | string;
  assessmentId: number;
  assessmentName: string;
  section: string;
  status: "ACTIVE" | "INACTIVE";
  hash: string;
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
  const [getLoginSession, setLoginSession] = useAtom(loginSession);
  const setLoader = useSetAtom(loader);
  const setToast = useSetAtom(toast);
  const [showAddAssessmentModal, setShowAddAssessmentModal] = useState(false);
  const [showViewAssessment, setShowViewAssessment] = useState(false);
  const [data, setData] = useState<TDataTableAssessmentData[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<TDataTableAssessmentData | null>(null);
  const [subjectList, setSubjectList] = useState<TSubjectListSelection[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(0);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDesc, setAssessmentDesc] = useState("");

  const [assessmentCount, setAssessmentCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);

  const assessmentLink = `${HOST_URL}/${selectedAssessment?.hash}/${selectedAssessment?.assessmentId}`;
  const firstName = sessionStorage.getItem("instructor.firstname");
  const lastName = sessionStorage.getItem("instructor.lastname");

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
    // {
    //   name: 'Passing',
    //   selector: (row: TDataTableAssessmentData) => row.passing,
    //   sortable: true,
    //   cell: (row: TDataTableAssessmentData) => (
    //     <p className="open-sans text-[15px]">
    //       {row.passing}
    //     </p>
    //   )
    // },
    {
      name: 'Actions',
      sortable: false,
      cell: (row: TDataTableAssessmentData) => (
        <div className="flex flex-row gap-[5px]">
          <Button variant="success" size="sm" onClick={() => {
            setShowViewAssessment(true);
            setSelectedAssessment(row);
          }}>
            <i className="fa-solid fa-eye"></i>
          </Button>
          <Button disabled={row.status === "ACTIVE"} variant="danger" size="sm" onClick={() => {
            setSelectedAssessment(row);
          }}>
            <i className="fa-regular fa-trash-can"></i>
          </Button>
          <Button variant="primary" size="sm" onClick={() => {
            setSelectedAssessment(row);
            setLoader({ show: true });
            setTimeout(() => {
              setLoader({ show: false });
              setTimeout(() => {
                let url = "/instructor/assessments/questions/";
                url += row.hash + "/" + row.assessmentId;
                url += "?title=" + row.assessmentName;
                navigate(url);
              }, 200);
            }, 500);
          }}>
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => {
            const email = sessionStorage.getItem("instructor.email") ?? "";
            setSelectedAssessment(row);
            window.location.href = `${BASE_URL}/instructor/export_result.php?instructor_email=${email}&assessment_id=${row.assessmentId}`;
          }}>
            <i className="fa-solid fa-file-export"></i>
          </Button>
        </div>
      )
    }
  ];

  const fetchSubjects = async () => {
    try {
      const email = sessionStorage.getItem("instructor.email");
      const { data } = await getSubjects(email ?? getLoginSession.email);
      if (data.status === 200 && data.message === "Success") {
        setSubjectCount(data.data.length);
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
      } else {
        setSubjectCount(0);
      }
    } catch (error) {
      setSubjectCount(0);
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  const fetchAssessments = async () => {
    try {
      const email = sessionStorage.getItem("instructor.email");
      const { data } = await getAssessments(email ?? getLoginSession.email);
      if (data.status === 200 && data.message === "Success") {
        setAssessmentCount(data.data.length);
        const assessments: TDataTableAssessmentData[] = data.data.map((value: GetAssessmentResponse, index: number) => {
          return {
            id: index,
            assessmentId: value.id,
            assessmentName: value.assessment_title,
            section: `${value.subject_title} - ${value.subject_section}`,
            status: value.assessment_status,
            hash: value.assessment_hash,
            result: value.result,
            passing: value.passing
          }
        });
        setData(assessments);
      } else {
        setAssessmentCount(0);
      }
    } catch (error) {
      setAssessmentCount(0);
      setToast({
        show: true,
        title: "Error Encountered",
        description: "Something went wrong while action is being done"
      });
    }
  };

  useEffect(() => {
    fetchAssessments();
    fetchSubjects();
  }, []);

  const handleOnSubmitAssessment = async () => {
    setShowAddAssessmentModal(false);
    setLoader({ show: true });
    try {
      const email = sessionStorage.getItem("instructor.email");
      const { data } = await addAssessment(
        assessmentTitle,
        assessmentDesc,
        selectedSubjectId,
        email ?? getLoginSession.email
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
          fetchAssessments();
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

  const handleOnCopyLink = () => {
    navigator.clipboard.writeText(assessmentLink);
    setShowViewAssessment(false);
    setToast({
      show: true,
      title: "Link Copied",
      description: `${assessmentLink} was copied to clipboard`
    });
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

  const isAddAssessmentEnabled = (): boolean => {
    return assessmentTitle !== "" && assessmentDesc !== "" && selectedSubjectId !== 0;
  };

  return (
    <>
      <MainContainer
        title="Assessments"
        profile={{ name: `${firstName} ${lastName}` }}
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
            count: subjectCount,
            onClick: () => {
              navigate("/instructor/subjects");
            }
          },
          {
            icon: <i className="fa-solid fa-bars-progress"></i>,
            label: "Assessments",
            selected: true,
            count: assessmentCount,
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
              sessionStorage.removeItem("instructor.firstname");
              sessionStorage.removeItem("instructor.lastname");
              sessionStorage.removeItem("instructor.email");
              sessionStorage.removeItem("instructor.college");
              setLoginSession({
                login: false,
                email: "",
                first_name: "",
                last_name: "",
                college: ""
              });
              navigate("/instructor");
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
            disabled={!isAddAssessmentEnabled()}
            className="open-sans-600"
            variant="success"
            type="submit"
            onClick={handleOnSubmitAssessment}>
            Add Assessment
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showViewAssessment} centered onHide={() => setShowViewAssessment(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="open-sans-600">Assessment Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[17px]">
            <p className="open-sans">
              Copy this assessment link to view the questions published
            </p>
            <input
              type="text"
              name="assessment_link"
              className="form-control open-sans-600 text-[#0d6efd]"
              placeholder="Assessment Link"
              required
              value={assessmentLink}
              readOnly
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="open-sans-600"
            variant="secondary"
            onClick={() => setShowViewAssessment(false)}>
            Close
          </Button>
          <Button
            className="open-sans-600"
            variant="success"
            type="submit"
            onClick={handleOnCopyLink}>
            Copy Link
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
