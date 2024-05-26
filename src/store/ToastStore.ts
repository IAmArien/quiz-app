/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { atom } from "jotai/vanilla";

export type TToastStatus = {
  show: boolean;
  title: string;
  description: string
};

export const toast = atom<TToastStatus>({
  show: false,
  title: "",
  description: ""
});
