/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import React from "react";
import { PropsWithChildren } from "react";
import { Badge, Button, Toast } from "react-bootstrap";
import { merge } from "../../utils";
import { useAtomValue, useSetAtom } from "jotai";
import { loader } from "../../store/LoaderStore";
import { toast } from "../../store/ToastStore";

export type TMainContainerSidebar = {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  count?: number;
  onClick: () => void;
};

export type TMainContainerSidebarProfile = {
  name: string;
};

export type TMainContainerProps = PropsWithChildren & {
  sidebar: TMainContainerSidebar[];
  profile: TMainContainerSidebarProfile;
  title: string;
};

export const MainContainer: React.FC<TMainContainerProps> = (props): JSX.Element => {
  const getLoader = useAtomValue(loader);
  const setToast = useSetAtom(toast);
  const getToast = useAtomValue(toast);
  const {
    sidebar,
    profile,
    title,
    children
  } = props;

  return (
    <div className="flex flex-row">
      {/** SIDE BAR  */}
      <div className="flex flex-col fixed top-0 left-0 bottom-0 h-full w-[300px] bg-[#262f40]">
        <div className="flex-1">
          <div className="flex flex-col gap-[10px] px-[10px] mt-[10px]">
            {sidebar.map((value: TMainContainerSidebar, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Button
                    variant="outline-primary"
                    className={merge(
                      "open-sans border-[0px] text-left px-[20px] py-[10px] text-[#FFFFFF] flex flex-row items-center gap-[12px]",
                      {
                        "bg-[#161d2d]": value.selected,
                        "open-sans-600": value.selected,
                        "hover:bg-[#161d2d]": true
                      }
                    )}
                    onClick={() => value.onClick()}>
                    <div className="flex-1 flex flex-row items-center gap-[12px]">
                      {value.icon}
                      {value.label}
                    </div>
                    {value.count && (
                      <Badge>{value.count}</Badge>
                    )}
                  </Button>
                </React.Fragment>
              )
            })}
          </div>
        </div>
        <div className="w-[300px] flex flex-row items-center gap-[12px] px-[20px] mb-[20px]">
          <i className="fa-regular fa-circle-user text-[40px] text-[#FFFFFF]"></i>
          <div className="flex flex-col flex-1 gap-[2px]">
            <h3 className="open-sans-600 text-[#FFFFFF]">
              {profile.name}
            </h3>
            <p className="open-sans text-[13px] text-[#FFFFFF]">
              View Profile
            </p>
          </div>
          <i className="fa-regular fa-gear text-[#FFFFFF] text-[20px]"></i>
        </div>
      </div>
      {/** MAIN CONTAINER */}
      <div className="flex-1 flex flex-col pl-[300px]">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-[17px] open-sans-600" href="#">
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i id="navbar-control" className="fa-solid fa-bars cursor-pointer" style={{ cursor: "pointer" }}></i>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/* Instructor
              {title && title !== '' && (
                <>
                  &nbsp;&nbsp;<i className="fa-solid fa-chevron-right"></i>&nbsp;&nbsp;
                  {title}
                </>
              )} */}
            </a>
          </div>
        </nav>
        <div className="pl-[20px]">
          {children}
          {getLoader.show && (
            <div className="z-[9999] absolute left-0 right-0 bottom-0 mb-[20px] flex flex-col justify-center items-center">
              <div className="spinner-border text-success" role="status">
              </div>
            </div>
          )}
          <div className="z-[9999] absolute left-0 right-0 bottom-0 mb-[20px] flex flex-col justify-center items-center">
            <Toast show={getToast.show} onClose={() => setToast({
              show: false,
              title: "",
              description: ""
            })}>
              <Toast.Header>
                <strong className="me-auto">{getToast.title}</strong>
                <small>Just now</small>
              </Toast.Header>
              <Toast.Body>{getToast.description}</Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
    </div>
  );
};
