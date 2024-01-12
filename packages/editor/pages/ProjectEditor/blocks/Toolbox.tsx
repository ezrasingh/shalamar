import { useMemo, useState } from "react";
import cx from "classnames";
import {
  AddIcon,
  RotateIcon,
  ScaleIcon,
  ToolboxIcon,
  TranslateIcon,
} from "@editor/common/icons";
import { useProjectEditor } from "../store";
import { DialogKey } from "../dialogs";

const BASE_CONTAINER_CLASS = cx(
  "flex",
  "flex-col",
  "absolute",
  "left-4",
  "top-16",
  "p-4"
);
const BASE_BTN_CLASSS = cx(
  "btn",
  "btn-circle",

  "btn-sm",
  "my-1"
);

export const Toolbox = () => {
  const editor = useProjectEditor((state) => ({
    debug: state.debug,
    openDialog: state.openDialog,
    setTransformMode: state.setTransformMode,
  }));
  const [toolboxVisible, setToolboxVisible] = useState(false);
  const toggleVisibility = () => setToolboxVisible(!toolboxVisible);
  const containerClass = cx(BASE_CONTAINER_CLASS, {
    stacked: !toolboxVisible,
  });
  const btns = useMemo<
    Array<{ icon: React.FC } & JSX.IntrinsicElements["button"]>
  >(
    () => [
      {
        icon: AddIcon,
        onClick: () => editor.openDialog(DialogKey.ResourceHub),
        disabled: false,
        className: "btn-outline",
      },
      {
        icon: TranslateIcon,
        onClick: () => editor.setTransformMode("translate"),
        disabled: editor.debug.selected === undefined,
        className: cx("btn-info", {
          "btn-outline": editor.debug.transform?.mode !== "translate",
        }),
      },
      {
        icon: RotateIcon,
        onClick: () => editor.setTransformMode("rotate"),
        disabled: editor.debug.selected === undefined,
        className: cx("btn-info", {
          "btn-outline": editor.debug.transform?.mode !== "rotate",
        }),
      },
      {
        icon: ScaleIcon,
        onClick: () => editor.setTransformMode("scale"),
        disabled: editor.debug.selected === undefined,
        className: cx("btn-info", {
          "btn-outline": editor.debug.transform?.mode !== "scale",
        }),
      },
    ],
    [editor.openDialog, editor.setTransformMode, editor.debug]
  );

  return (
    <div className={containerClass}>
      <button
        className={cx(BASE_BTN_CLASSS, "mb-2", {
          "btn-active": toolboxVisible,
          "btn-info": toolboxVisible,
        })}
        onClick={toggleVisibility}
      >
        <ToolboxIcon />
      </button>
      {toolboxVisible &&
        btns.map(({ icon: ToolIcon, ...props }, index) => (
          <button
            key={index}
            {...props}
            className={cx(
              BASE_BTN_CLASSS,
              props.disabled ? {} : props.className
            )}
            children={<ToolIcon />}
          />
        ))}
    </div>
  );
};
