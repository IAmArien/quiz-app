/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { AddAssessmentResponse, AddQuestionsResponse, AddStudentToSubjectResponse, AddSubjectResponse, BaseResponse, GetAssessmentResponse, GetQuestionsResponse, GetSubjectResponse, LoginResponse, RegisterResponse } from "./types";

export const login = async (email: string, password: string) => {
  const response = await axios.post<BaseResponse<LoginResponse>>(
    `${BASE_URL}/instructor/login.php`,
    {
      email,
      password,
      type: "instructor",
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const register = async (
  firstName: string,
  lastName: string,
  college: string,
  email: string,
  password: string
) => {
  const response = await axios.post<BaseResponse<RegisterResponse>>(
    `${BASE_URL}/instructor/register.php`,
    {
      first_name: firstName,
      last_name: lastName,
      college,
      email,
      password,
      type: "instructor",
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const addSubject = async (
  title: string,
  description: string,
  section: string,
  email: string
) => {
  const response = await axios.post<BaseResponse<AddSubjectResponse>>(
    `${BASE_URL}/instructor/add_subject.php`,
    {
      subject: title,
      description,
      section,
      instructor_email: email
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const getSubjects = async (email: string) => {
  const response = await axios.get<BaseResponse<GetSubjectResponse[]>>(
    `${BASE_URL}/instructor/get_subject.php`,
    {
      params: {
        instructor_email: email
      }
    }
  );
  return response;
};

export const deleteSubject = async (subjectId: number) => {
  const response = await axios.post<BaseResponse<any>>(
    `${BASE_URL}/instructor/delete_subject.php`,
    {
      subject_id: subjectId
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const addAssessment = async (
  title: string,
  description: string,
  subjectId: number,
  email: string
) => {
  const response = await axios.post<BaseResponse<AddAssessmentResponse>>(
    `${BASE_URL}/instructor/add_assessments.php`,
    {
      assessment: title,
      description,
      subject_id: subjectId,
      instructor_email: email
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const getAssessments = async (email: string) => {
  const response = await axios.get<BaseResponse<GetAssessmentResponse[]>>(
    `${BASE_URL}/instructor/get_assessments.php`,
    {
      params: {
        instructor_email: email
      }
    }
  );
  return response;
};

export const getAssessment = async (assessmentId: number) => {
  const response = await axios.get<BaseResponse<GetAssessmentResponse[]>>(
    `${BASE_URL}/instructor/get_assessment.php`,
    {
      params: {
        assessment_id: assessmentId
      }
    }
  );
  return response;
};

export const addQuestions = async (
  assessmentHash: string,
  assessmentId: number,
  email: string,
  questions: string
) => {
  const response = await axios.post<BaseResponse<AddQuestionsResponse[]>>(
    `${BASE_URL}/instructor/add_questions.php`,
    {
      assessment_hash: assessmentHash,
      assessment_id: assessmentId,
      questions: JSON.parse(questions),
      instructor_email: email
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const getQuestions = async (assessmentId: number, email: string) => {
  const response = await axios.get<BaseResponse<GetQuestionsResponse[]>>(
    `${BASE_URL}/instructor/get_questions.php`,
    {
      params: {
        assessment_id: assessmentId,
        instructor_email: email
      }
    }
  );
  return response;
};

export const addStudentToSubject = async (
  subjectId: number,
  studentId: string,
  email: string
) => {
  const response = await axios.post<BaseResponse<AddStudentToSubjectResponse>>(
    `${BASE_URL}/instructor/add_student_id.php`,
    {
      subject_id: subjectId,
      student_id: studentId,
      instructor_email: email
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const disableQuestions = async (
  assessmentId: number,
  email: string
) => {
  const response = await axios.post<BaseResponse<AddStudentToSubjectResponse>>(
    `${BASE_URL}/instructor/disable_questions.php`,
    {
      assessment_id: assessmentId,
      instructor_email: email
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};
