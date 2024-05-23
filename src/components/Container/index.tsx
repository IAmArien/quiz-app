/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import React from "react";
import { PropsWithChildren } from "react";

export type TMainContainerSidebar = {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  link: string;
};

export type TMainContainerProps = PropsWithChildren & {
  sidebar: TMainContainerSidebar[];
  title: string;
};

export const MainContainer: React.FC<TMainContainerProps> = (props): JSX.Element => {
  const {
    sidebar,
    title,
    children
  } = props;

  return (
    <div className="flex flex-row">
      <div className="fixed top-0 left-0 bottom-0 h-full w-[300px] bg-[#F0F0F0]">
        {sidebar.map((value: TMainContainerSidebar, index: number) => {
          return (
            <React.Fragment key={index}>
            </React.Fragment>
          )
        })}
      </div>
      <div className="flex-1 flex flex-col pl-[300px]">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-[17px] open-sans-600" href="#">
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i id="navbar-control" className="fa-solid fa-bars" style={{ cursor: "pointer" }}></i>
              &nbsp;&nbsp;&nbsp;&nbsp;
              Instructor
              {title && title !== '' && (
                <>
                  &nbsp;&nbsp;<i className="fa-solid fa-chevron-right"></i>&nbsp;&nbsp;
                  {title}
                </>
              )}
            </a>
          </div>
        </nav>
        <div className="pl-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
};
