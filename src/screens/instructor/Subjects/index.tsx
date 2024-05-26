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
import { useAtomValue, useSetAtom } from 'jotai';
import { loader } from '../../../store/LoaderStore';

type TDataTableSubjectsData = {
  id: number | string;
  subjectId: number;
  subject: string;
  section: string;
  description: string;
  students: string;
}

export const Subjects = (): JSX.Element => {
  const navigate = useNavigate();
  const getLoginSession = useAtomValue(loginSession);
  const setLoader = useSetAtom(loader);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<TDataTableSubjectsData | null>(null);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [section, setSection] = useState("");
  const [subjectDesc, setSubjectDesc] = useState("");
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState<TDataTableSubjectsData[]>([]);

  const name = `${getLoginSession.first_name} ${getLoginSession.last_name}`;

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
          <Button variant="danger" size="sm">
            <i className="fa-regular fa-trash-can"></i>
          </Button>
          <Button variant="primary" size="sm">
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => { }}>
            <i className="fa-solid fa-eye"></i>
          </Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    setData([
      {
        id: 1,
        subjectId: 1,
        subject: "Mathematics",
        section: "Section I",
        description: "Mathematics subject with 3 sections",
        students: "10 Students"
      },
      {
        id: 2,
        subjectId: 2,
        subject: "Mathematics",
        section: "Section II",
        description: "Mathematics subject with 3 sections",
        students: "5 Students"
      },
      {
        id: 3,
        subjectId: 3,
        subject: "Mathematics",
        section: "Section III",
        description: "Mathematics subject with 3 sections",
        students: "12 Students"
      },
      {
        id: 4,
        subjectId: 4,
        subject: "English III",
        section: "Section I",
        description: "English (III) subject with 2 sections",
        students: "0 Students"
      },
      {
        id: 5,
        subjectId: 5,
        subject: "English III",
        section: "Section II",
        description: "English (III) subject with 2 sections",
        students: "0 Students"
      }
    ])
  }, []);

  const handleOnSubmitSubject = () => {
    setLoader({ show: true });
  };

  const handleOnSubmitStudent = () => { };

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

  return (
    <>
      <MainContainer
        title="Subjects"
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
            selected: true,
            count: 6,
            onClick: () => {
              navigate("/instructor/subjects");
            }
          },
          {
            icon: <i className="fa-regular fa-bars-progress"></i>,
            label: "Assessments",
            selected: false,
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
            onClick={() => setShowAddSubjectModal(false)}>
            Close
          </Button>
          <Button
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
