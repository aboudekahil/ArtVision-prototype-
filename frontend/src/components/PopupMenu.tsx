import React from "react";
import { Button, DialogTrigger, Popover } from "react-aria-components";

type PopupMenuProps = {
  children: [React.JSX.Element, React.JSX.Element];
  className?: string;
};

const PopupMenu: React.FC<PopupMenuProps> = ({ children, className }) => {
  return (
    <DialogTrigger>
      <Button className={className}>{children[0]}</Button>
      <Popover>{children[1]}</Popover>
    </DialogTrigger>
  );
};

export default PopupMenu;
