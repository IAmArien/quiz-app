/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import React from "react";
import { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import { merge } from "../../utils";

export type TMainContainerSidebar = {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
};

export type TMainContainerSidebarProfile = {
  name: string;
  email: string;
};

export type TMainContainerProps = PropsWithChildren & {
  sidebar: TMainContainerSidebar[];
  profile: TMainContainerSidebarProfile;
  title: string;
};

export const MainContainer: React.FC<TMainContainerProps> = (props): JSX.Element => {
  const {
    sidebar,
    profile,
    title,
    children
  } = props;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col fixed top-0 left-0 bottom-0 h-full w-[300px] bg-[#F0F0F0]">
        <div className="w-[300px] flex flex-row items-center gap-[12px] px-[20px] mt-[20px]">
          <i className="fa-solid fa-circle-user text-[50px]"></i>
          <div className="flex flex-col flex-1">
            <h3 className="open-sans-600">
              {profile.name}
            </h3>
            <p className="open-sans text-[#8c8c8c]">
              {profile.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] px-[20px] mt-[30px]">
          {sidebar.map((value: TMainContainerSidebar, index: number) => {
            return (
              <React.Fragment key={index}>
                <Button
                  variant={value.selected ? "success" : "secondary"}
                  className={merge("open-sans text-left pl-[20px] flex flex-row items-center gap-[12px]", {
                    "open-sans-600": value.selected
                  })}
                  onClick={() => value.onClick()}>
                  {value.icon}
                  {value.label}
                </Button>
              </React.Fragment>
            )
          })}
        </div>
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
