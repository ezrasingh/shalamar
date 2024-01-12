import * as THREE from "three";
import { useCallback, useEffect } from "react";
import { Key } from "ts-key-enum";
import { useEngine } from "@engine/store";
import { useProjectEditor } from "../store";
import { DialogKey } from "../dialogs";

export function useHotKeys() {
  const engine = useEngine((state) => ({
    removeObject: state.removeObject,
  }));
  const editor = useProjectEditor((state) => ({
    ui: state.ui,
    debug: state.debug,
    openDialog: state.openDialog,
    closeDialog: state.closeDialog,
    setTransformMode: state.setTransformMode,
    clearSelection: state.clearSelection,
  }));

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      const isDialogOpen = editor.ui.currentDialog !== undefined;
      // ? case-insensitve string comparison, localCompare returns 0 or -1
      const keyIs = (value: string) =>
        0 === key.localeCompare(value, "en", { sensitivity: "base" });

      if (keyIs("q")) return editor.setTransformMode("translate");
      if (keyIs("w")) return editor.setTransformMode("rotate");
      if (keyIs("e")) return editor.setTransformMode("scale");
      if (keyIs("a")) {
        return editor.openDialog(DialogKey.ResourceHub);
      }
      if (key === Key.Escape) {
        return editor.closeDialog();
      }
      if (key === Key.Delete) {
        if (isDialogOpen) return;
        if (editor.debug.selected instanceof THREE.Object3D) {
          engine.removeObject(editor.debug.selected.id);
          return editor.clearSelection();
        }
      }
    },
    [editor, engine]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editor, engine]);
}
