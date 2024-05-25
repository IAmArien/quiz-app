/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import DataTable from 'react-data-table-component';
import { Button, Container, Form, Modal } from "react-bootstrap";
import { MainContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

type TDataTableSubjectsData = {
  id: number;
  subject: string;
  description: string;
}

export const Subjects = (): JSX.Element => {
  const navigate = useNavigate();
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [subjectDesc, setSubjectDesc] = useState("");
  const [data, setData] = useState<TDataTableSubjectsData[]>([]);

  const columns = [
    {
      name: 'Subject (Title)',
      selector: (row: any) => row.subject,
      sortable: true
    },
    {
      name: 'Subject (Description)',
      selector: (row: any) => row.description,
      sortable: true
    },
    {
      name: 'Actions',
      sortable: false,
      cell: () => (
        <div className="flex flex-row gap-[5px]">
          <Button variant="outline-danger" size="sm">
            <i className="fa-regular fa-trash-can"></i>
          </Button>
          <Button variant="outline-primary" size="sm">
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
        </div>
      )
    },
  ];

  useEffect(() => {
    setData([
      {
        id: 1,
        subject: "Mathematics",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      },
      {
        id: 2,
        subject: "English III",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      }
    ])
  }, []);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const customAction = (): JSX.Element => {
    return (
      <Button className="open-sans" variant="outline-success" size="sm" onClick={() => {
        setShowAddSubjectModal(true);
      }}>
        <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;
        Add new subject
      </Button>
    );
  };

  return (
    <>
      <MainContainer
        title="Subjects"
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
            selected: true,
            onClick: () => {
              navigate("/instructor/subjects");
            }
          },
          {
            icon: <i className="fa-regular fa-bars-progress"></i>,
            label: "Assessments",
            selected: false,
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
            {data.length > 0 ? (
              <>
                <DataTable
                  selectableRows={false}
                  dense={false}
                  highlightOnHover
                  pagination
                  actions={customAction()}
                  className="open-sans-600"
                  customStyles={{
                    headCells: {
                      style: {
                        fontSize: 15,
                        fontFamily: '"Open Sans", sans-serif',
                        fontOpticalSizing: "auto",
                        fontWeight: 700,
                        fontStyle: "normal",
                      }
                    }
                  }}
                  columns={columns}
                  data={data}
                />
              </>
            ) : (
              <div className="absolute left-[300px] right-0 bottom-0 top-0 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-[15px]">
                  <i className="fa-regular fa-hourglass text-[30px]"></i>
                  <h3 className="open-sans-600">No records to display</h3>
                </div>
              </div>
            )}
          </div>
        </Container>
      </MainContainer>
      <Form onSubmit={handleOnSubmit}>
        <Modal show={showAddSubjectModal} centered onHide={() =>  setShowAddSubjectModal(false)}>
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
            <Button className="open-sans-600" variant="secondary" onClick={() =>  setShowAddSubjectModal(false)}>Close</Button>
            <Button className="open-sans-600" variant="success" type="submit">Add Subject</Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
};
