import { useMemo } from "react";
import { ContextMenuIcon } from "../icons";

export interface PopupMenuProps {
  options: { [name: string]: () => void };
}

export const PopupMenu: React.FC<PopupMenuProps> = ({ options }) => {
  const menuOptions = useMemo(() => {
    return Object.entries(options).map(([name, action]) => (
      <li key={name} onClick={action}>
        <a className="capitalize">{name}</a>
      </li>
    ));
  }, [options]);
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="cursor-pointer">
        <ContextMenuIcon />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-300 rounded-md p-2 my-2 shadow"
      >
        {menuOptions}
      </ul>
    </div>
  );
};
