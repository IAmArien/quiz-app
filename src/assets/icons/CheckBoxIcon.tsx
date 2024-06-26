/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import * as React from "react";

type TCheckBoxIconProps = {
  checked?: boolean;
};

export const CheckBoxIcon: React.FC<TCheckBoxIconProps> = ({
  checked = true,
}): JSX.Element => {
  if (checked) {
    return (
      <svg
        data-testid="checkbox-icon-checked"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" rx="4" fill="#198754" />
        <path
          d="M6 11L8.5 13.5L15 7"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      data-testid="checkbox-icon-unchecked"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="3.5"
        fill="white"
        stroke="#D7D7D7"
      />
    </svg>
  );
};
