/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { AddSubjectResponse, BaseResponse, GetSubjectResponse, LoginResponse } from "./types";

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
}

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
