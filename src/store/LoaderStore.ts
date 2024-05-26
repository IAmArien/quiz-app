/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import { atom } from "jotai/vanilla";

export type TLoaderStatus = {
  show: boolean;
};

export const loader = atom<TLoaderStatus>({
  show: false
});
