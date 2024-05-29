/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../components";
import { Badge, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSSObject } from "styled-components";

type TDataTableSubjectsData = {
  id: number;
  subjectId: number;
  subject: string;
  section: string;
  description: string;
  assessments: string;
};

export const Subjects = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<TDataTableSubjectsData | null>(null);
  const [data, setData] = useState<TDataTableSubjectsData[]>([]);
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
            setSelectedSubject(row);
          }}>
            <i className="fa-solid fa-eye"></i>&nbsp;&nbsp;View Assessments
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
        subject: "Mathematics II",
        section: "Section I",
        description: "Math subject with 3 sections",
        assessments: "0 Assessments"
      }
    ])
  }, []);

  const headCellStyle: CSSObject = {
    fontSize: 15,
    fontFamily: '"Open Sans", sans-serif',
    fontOpticalSizing: "auto",
    fontWeight: 700,
    fontStyle: "normal",
  };

  return (
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
          count: 6,
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
  );
};
