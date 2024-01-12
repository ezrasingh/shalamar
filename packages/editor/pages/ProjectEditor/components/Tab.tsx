import cx from "classnames";
import { CloseIcon } from "@editor/common/icons";
import { TabVariants } from "../store";

export interface TabProps {
  id: string;
  active?: boolean;
  type: TabVariants;
  onClose: () => void;
  onClick: () => void;
}

export const BASE_TAB_CLASS = cx("tab", "tab-lg", "tab-lifted");

const TAB_BADGE_CLASS = cx(
  "badge",
  "badge-primary",
  "indicator-item",
  "indicator-start",
  "indicator-middle",
  "opacity-50",
  "capitalize",
  "pb-1",
  "ml-4"
);

export const Tab: React.FC<TabProps> = ({
  id,
  active,
  type,
  onClick,
  onClose,
}) => {
  return (
    <a
      className={cx(BASE_TAB_CLASS, {
        "tab-active": active,
        "outline outline-1": active,
      })}
    >
      <span
        className="absolute top-1 right-1 cursor-pointer opacity-40 text-sm"
        onClick={onClose}
      >
        <CloseIcon />
      </span>
      <span className="indicator mx-2" onClick={onClick}>
        <span className={cx({ "mx-8 mb-1 pl-8": type !== "empty" })}>{id}</span>
        {/** only show badge for non-empty state tabs */}
        {type !== "empty" && <em className={TAB_BADGE_CLASS}>{type}</em>}
      </span>
    </a>
  );
};
