import { Suspense, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { Loading } from "@editor/common/components";
import { useProjectEditor } from "../store";
import { DialogKey, DialogView, dialogRegistry } from "../dialogs";

export const DialogPortal = () => {
  const container = useRef(document.getElementById("dialog-root"));
  const editor = useProjectEditor((state) => ({
    ui: state.ui,
    closeDialog: state.closeDialog,
  }));
  const CurrentDialog = useMemo<DialogView>(() => {
    const dialogKey = editor.ui.currentDialog;
    if (dialogKey && dialogKey in dialogRegistry) {
      return dialogRegistry[dialogKey as DialogKey];
    }
    return () => <></>;
  }, [editor.ui]);

  if (!container.current) {
    return <dialog className="modal p-0 m-0" open={false} />;
  }

  return createPortal(
    <dialog
      className="modal p-0 m-0"
      open={editor.ui.currentDialog !== undefined}
    >
      <Suspense fallback={<Loading />}>
        <CurrentDialog />
      </Suspense>
    </dialog>,
    container.current
  );
};
