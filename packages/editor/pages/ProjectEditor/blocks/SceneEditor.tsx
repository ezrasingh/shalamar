import type { SystemOptions } from "@engine/hooks/useSystem";
import { useRef } from "react";
import { Leva } from "leva";
import { SceneHelpersProps, ViewPort } from "@engine/components";
import { useProjectEditor } from "../store";
import { Toolbox } from ".";
import { useObjectGui } from "../hooks";

export const SceneEditor = () => {
  const statsContainer = useRef(null);
  const editor = useProjectEditor((state) => ({
    ui: state.ui,
    debug: state.debug,
    selected: state.debug.selected,
    selectNode: state.selectNode,
    clearSelection: state.clearSelection,
  }));
  const updateGui = useObjectGui(editor.selected);
  const systemHooks: SystemOptions["hooks"] = {
    onObjectClick: (object) => {
      updateGui(object);
      editor.selectNode(object);
    },
    onPointerMissed: () => {
      updateGui();
      editor.clearSelection();
    },
    onObjectHover: (_objects) => {}, // !todo
  };

  const debugHooks: Partial<SceneHelpersProps> = {
    onTransformChange: updateGui,
  };
  const isDialogOpen = editor.ui.currentDialog !== undefined;

  return (
    <>
      <Leva
        collapsed
        hidden={isDialogOpen}
        oneLineLabels
        titleBar={{
          title: "Inspector",
          position: { x: -32, y: 2 * 64 },
        }}
      />
      <ViewPort
        debug={{ ...editor.debug, ...debugHooks, statsContainer }}
        systemOptions={{ hooks: systemHooks }}
      />
      <Toolbox />
      <div ref={statsContainer} className="stats-container" />
    </>
  );
};
