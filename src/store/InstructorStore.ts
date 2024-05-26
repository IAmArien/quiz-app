/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { atom } from "jotai/vanilla";

export type TLoginSession = {
  login: boolean;
  email: string;
  first_name: string;
  last_name: string;
  college: string;
};

export const loginSession = atom<TLoginSession>({
  login: false,
  email: "",
  first_name: "",
  last_name: "",
  college: "",
});
