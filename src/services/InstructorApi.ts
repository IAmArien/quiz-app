/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { AddAssessmentResponse, AddSubjectResponse, BaseResponse, GetAssessmentResponse, GetSubjectResponse, LoginResponse } from "./types";

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
