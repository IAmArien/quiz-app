/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import DataTable from 'react-data-table-component';
import { Button, Container, Modal } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CSSObject } from 'styled-components';
import { loginSession } from '../../../store';
import { useAtom, useSetAtom } from 'jotai';
import { loader } from '../../../store/LoaderStore';
import { toast } from '../../../store/ToastStore';
import { GetSubjectResponse, addStudentToSubject, addSubject, deleteSubject, getAssessments, getSubjects } from '../../../services';

type TDataTableSubjectsData = {
  id: number;
  subjectId: number;
  subject: string;
  section: string;
  description: string;
  students: string;
}

export const Subjects = (): JSX.Element => {
  const navigate = useNavigate();
  const [getLoginSession, setLoginSession] = useAtom(loginSession);
  const setLoader = useSetAtom(loader);
  const setToast = useSetAtom(toast);
  const [showDeleteSubjectModal, setShowDeleteSubjectModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<TDataTableSubjectsData | null>(null);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [section, setSection] = useState("");
  const [subjectDesc, setSubjectDesc] = useState("");
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState<TDataTableSubjectsData[]>([]);

  const [assessmentCount, setAssessmentCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);

  const firstName = sessionStorage.getItem("instructor.firstname");
  const lastName = sessionStorage.getItem("instructor.lastname");

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
      name: 'Students',
      selector: (row: TDataTableSubjectsData) => row.students,
      sortable: true,
      cell: (row: any) => (
        <div className="flex flex-row gap-[12px] items-center pr-[50px]">
          <p className="open-sans text-[15px]">
            {row.students}
          </p>
        </div>
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: (row: TDataTableSubjectsData) => (
        <div className="flex flex-row gap-[5px]">
          <Button variant="success" size="sm" onClick={() => {
            setShowAddStudentModal(true);
            setSelectedSubject(row);
          }}>
            <i className="fa-solid fa-user-plus"></i>
          </Button>
          <Button variant="danger" size="sm" onClick={() => {
            setShowDeleteSubjectModal(true);
            setSelectedSubject(row);
          }}>
            <i className="fa-regular fa-trash-can"></i>
          </Button>
          <Button variant="primary" size="sm" onClick={() => {
            setSelectedSubject(row);
          }}>
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => { }}>
            <i className="fa-solid fa-eye"></i>
          </Button>
        </div>
      )
    }
  ];

  const fetchSubjects = async () => {
    try {
      const email = sessionStorage.getItem("instructor.email") ?? getLoginSession.email;
      const { data } = await getSubjects(email);
      if (data.status === 200 && data.message === "Success") {
        setSubjectCount(data.data.length);
        const subjects = data.data.map((value: GetSubjectResponse, index: number) => {
          return {
            id: index,
            subjectId: value.id,
            subject: value.subject_title,
            section: value.section,
            description: value.subject_description,
            students: value.students
          }
        });
        setData(subjects);
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
      const email = sessionStorage.getItem("instructor.email") ?? "";
      const { data } = await getAssessments(email);
      if (data.status === 200 && data.message === "Success") {
        setAssessmentCount(data.data.length);
      } else {
        setAssessmentCount(0);
      }
    } catch (error) {
      setAssessmentCount(0);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchAssessments();
  }, []);

  const handleOnSubmitSubject = async () => {
    setShowAddSubjectModal(false);
    setLoader({ show: true });
    try {
      const email = sessionStorage.getItem("instructor.email");
      const { data } = await addSubject(
        subjectTitle,
        subjectDesc,
        section,
        email ?? getLoginSession.email
      );
      if (data.status === 200 && data.message === "Success") {
        setSubjectTitle("");
        setSubjectDesc("");
        setSection("");
        setTimeout(() => {
          setLoader({ show: false });
          setToast({
            show: true,
            title: "Added Subject",
            description: "Subject was added successfully"
          });
          fetchSubjects();
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

  const handleOnDeleteSubject = async () => {
    setShowDeleteSubjectModal(false);
    setLoader({ show: true });
    try {
      const { data } = await deleteSubject(selectedSubject?.subjectId ?? 0);
      if (data.status === 200 && data.message === "Success") {
        setTimeout(() => {
          setLoader({ show: false });
          setToast({
            show: true,
            title: "Removed Subject",
            description: "Subject was removed successfully"
          });
          fetchSubjects();
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

  const handleOnSubmitStudent = async () => {
    setShowAddStudentModal(false);
    setLoader({ show: true });
    try {
      const email = sessionStorage.getItem("instructor.email");
      const { data } = await addStudentToSubject(
        selectedSubject?.subjectId ?? 0,
        studentId,
        email ?? getLoginSession.email
      );
      if (data.status === 200 && data.message === "Success") {
        setStudentId("");
        setTimeout(() => {
          setLoader({ show: false });
          setToast({
            show: true,
            title: "Student Added",
            description: "Student was successfully added to the subject"
          });
          fetchSubjects();
        }, 500);
      } else {
        setTimeout(() => {
          setLoader({ show: false });
          setToast({
            show: true,
            title: "Error Encountered",
            description: "Something went wrong while action is being done"
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
        setShowAddSubjectModal(true);
      }}>
        <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;
        Add New Subject
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

  const addSubjectEnabled = (): boolean => {
    return subjectTitle !== "" && subjectDesc !== "" && section !== "";
  };

  return (
    <>
      <MainContainer
        title="Subjects"
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
            selected: true,
            count: subjectCount,
            onClick: () => {
              navigate("/instructor/subjects");
            }
          },
          {
            icon: <i className="fa-solid fa-bars-progress"></i>,
            label: "Assessments",
            selected: false,
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
              title="Subjects Management"
              striped
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
      <Modal show={showDeleteSubjectModal} centered onHide={() => setShowDeleteSubjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="open-sans-600">Delete Subject?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="open-sans text-[15px]">
            Are you sure you want to remove this subject? This will also delete any assessments linked
            to this subject / section. It cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="open-sans-600"
            variant="secondary"
            onClick={() => {
              setShowDeleteSubjectModal(false);
            }}>
            Close
          </Button>
          <Button
            className="open-sans-600"
            variant="danger"
            type="submit"
            onClick={handleOnDeleteSubject}>
            Delete Subject
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddSubjectModal} centered onHide={() => setShowAddSubjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="open-sans-600">Add New Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[12px]">
            <input
              type="text"
              name="subject"
              className="form-control open-sans"
              placeholder="Subject (Title)"
              required
              value={subjectTitle}
              onChange={(event) => {
                setSubjectTitle(event.currentTarget.value);
              }}
            />
            <input
              type="text"
              name="section"
              className="form-control open-sans"
              placeholder="Section (eg. Section I)"
              required
              value={section}
              onChange={(event) => {
                setSection(event.currentTarget.value);
              }}
            />
            <textarea
              rows={4}
              name="description"
              className="form-control open-sans"
              placeholder="Subject (Description)"
              required
              value={subjectDesc}
              onChange={(event) => {
                setSubjectDesc(event.currentTarget.value)
              }}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="open-sans-600"
            variant="secondary"
            onClick={() => {
              setShowAddSubjectModal(false);
              setSubjectTitle("");
              setSubjectDesc("");
              setSection("");
            }}>
            Close
          </Button>
          <Button
            disabled={!addSubjectEnabled()}
            className="open-sans-600"
            variant="success"
            type="submit"
            onClick={handleOnSubmitSubject}>
            Add Subject
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddStudentModal} centered onHide={() => setShowAddStudentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="open-sans-600">Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[17px]">
            <p className="open-sans">
              Add student to this subject:&nbsp;
              <b>{selectedSubject?.subject}</b> (<b>{selectedSubject?.section}</b>)
            </p>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="open-sans-600"
            variant="secondary"
            onClick={() => setShowAddStudentModal(false)}>
            Close
          </Button>
          <Button
            className="open-sans-600"
            variant="success"
            type="submit"
            onClick={handleOnSubmitStudent}>
            Add Student
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
