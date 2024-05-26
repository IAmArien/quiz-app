/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { BaseResponse, LoginResponse } from "./types";

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
