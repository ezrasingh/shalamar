import cx from "classnames";
import { useMemo } from "react";
import { useProjectEditor } from "../store";

export interface DialogProps extends React.PropsWithChildren {
  actions?: {
    [name: string]: (
      closeDialog: () => void
    ) => Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      "children"
    >;
  };
  title?: string;
  className?: React.HTMLAttributes<"div">["className"];
}

const DEFAULT_ACTIONS: DialogProps["actions"] = {
  close: (closeDialog) => ({
    className: "btn btn-info capitalize",
    onClick: closeDialog,
  }),
};

export const Dialog: React.FC<DialogProps> = ({
  actions = DEFAULT_ACTIONS,
  children,
  title,
  className,
}) => {
  const editor = useProjectEditor((state) => ({
    closeDialog: state.closeDialog,
  }));
  const dialogActions = useMemo(() => {
    return Object.entries(actions).map(([name, propsBuilder], index) => (
      <button key={index} {...propsBuilder(editor.closeDialog)}>
        {name}
      </button>
    ));
  }, [actions, editor]);
  const containerClass = cx(
    className,
    "modal-box",
    "bg-slate-900",
    "rounded-xl",
    "max-w-full"
  );
  return (
    <div className={containerClass}>
      {title && (
        <h2 className="flex justify-center text-2xl m-4 mb-8 capitalize">
          {title}
        </h2>
      )}
      {children}
      <div className="modal-action flex justify-center items-center">
        {dialogActions}
      </div>
    </div>
  );
};
