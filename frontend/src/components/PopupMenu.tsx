import React, { PropsWithChildren } from "react";

type PopUpMenuChild = string | JSX.Element;

type PopUpMenu = {
  className?: string;
  children?: PopUpMenuChild | PopUpMenuChild[];
};

export const PopUpMenu: React.FC<PopUpMenu> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const PopUpMenuItem: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
