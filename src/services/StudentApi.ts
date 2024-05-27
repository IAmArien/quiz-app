/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import axios from "axios";
import { BaseResponse, LoginResponse, RegisterResponse } from "./types";
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
