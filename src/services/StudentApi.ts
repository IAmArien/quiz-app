/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import axios from "axios";
import { AddAnswersResponse, BaseResponse, GetAnswersResponse, LoginResponse, RegisterResponse } from "./types";
import { BASE_URL } from "../utils/constants";

export const login = async (email: string, password: string) => {
  const response = await axios.post<BaseResponse<LoginResponse>>(
    `${BASE_URL}/students/login.php`,
    {
      email,
      password,
      type: "student",
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
  studentId: string,
  college: string,
  email: string,
  password: string
) => {
  const response = await axios.post<BaseResponse<RegisterResponse>>(
    `${BASE_URL}/students/register.php`,
    {
      first_name: firstName,
      last_name: lastName,
      student_id: studentId,
      college,
      email,
      password,
      type: "student",
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const verifyAssessment = async (
  assessmentId: string,
  subjectId: string,
  studentId: string
) => {
  const response = await axios.post<BaseResponse<any>>(
    `${BASE_URL}/students/verify_assessment.php`,
    {
      assessment_id: assessmentId,
      subject_id: subjectId,
      student_id: studentId
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const addQuestions = async (
  assessmentHash: string,
  assessmentId: number,
  email: string,
  questions: string,
  studentId: string
) => {
  const response = await axios.post<BaseResponse<AddAnswersResponse[]>>(
    `${BASE_URL}/students/add_answers.php`,
    {
      assessment_hash: assessmentHash,
      assessment_id: assessmentId,
      questions: JSON.parse(questions),
      instructor_email: email,
      student_id: studentId
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response;
};

export const getAnswers = async (
  assessmentId: number,
  studentId: string,
  email: string
) => {
  const response = await axios.get<BaseResponse<GetAnswersResponse[]>>(
    `${BASE_URL}/students/get_answers.php`,
    {
      params: {
        assessment_id: assessmentId,
        instructor_email: email,
        student_id: studentId
      }
    }
  );
  return response;
};
