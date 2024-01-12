import type { NodeModel } from "@minoru/react-dnd-treeview";
import type { IconType } from "react-icons";
import cx from "classnames";
import { PopupMenu, PopupMenuProps } from "@editor/common/blocks";

export interface GraphNodeProps<T = unknown> {
  className?: React.HTMLAttributes<"span">["className"];
  depth: number;
  onClick?: () => void;
  icons: {
    isOpen: IconType;
    isClosed: IconType;
  };
  isOpen: boolean;
  node: NodeModel<T>;
  onToggle: () => void;
  popupMenuOptions?: PopupMenuProps["options"];
}

export const GraphNode: React.FC<GraphNodeProps> = ({
  node,
  depth,
  isOpen,
  icons,
  popupMenuOptions,
  className: nodeClass,
  onClick: handleClick,
  onToggle,
}) => {
  const Icon = isOpen ? icons.isOpen : icons.isClosed;
  return (
    <div
      style={{ marginLeft: depth * 10 }}
      className="flex flex-row items-center cursor-pointer"
    >
      <span className="mr-2" onClick={onToggle}>
        <Icon />
      </span>
      <span
        className={cx("flex-grow", nodeClass)}
        onClick={() => {
          onToggle();
          if (handleClick) handleClick();
        }}
      >
        {node.text}
      </span>
      {popupMenuOptions && <PopupMenu options={popupMenuOptions} />}
    </div>
  );
};
