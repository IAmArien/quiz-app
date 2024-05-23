/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import clsx, { ClassValue as CV } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const merge = (...args: CV[]): string => {
  return twMerge(clsx(args));
};
