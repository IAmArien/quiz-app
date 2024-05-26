/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type LoginResponse = {
  email: string;
  first_name: string;
  last_name: string;
  college: string;
};
