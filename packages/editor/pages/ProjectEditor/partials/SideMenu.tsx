import { useState, useEffect } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { SceneGraph, ResourceGraph } from "../blocks";
import { useProjectEditor } from "../store";

export const SideMenu = () => {
  const editor = useProjectEditor((state) => ({
    ui: state.ui,
  }));
  const [paneSizes, setPaneSizes] = useState<Array<string | number>>([
    30,
    "auto",
  ]);
  const currentTabType = editor.ui.activeTab?.type;

  useEffect(() => {
    if (currentTabType === "scene") setPaneSizes(["auto", "50%"]);
    else setPaneSizes([30, "auto"]);
  }, [currentTabType]);

  return (
    <SplitPane
      split="horizontal"
      className="flex flex-col"
      sizes={paneSizes}
      onChange={setPaneSizes}
      sashRender={(_, active) => <SashContent active={active} type="vscode" />}
    >
      <Pane
        className="flex justify-center items-center flex-grow border-b border-slate-500 p-2"
        minSize={30}
        maxSize={currentTabType === "empty" ? 30 : "80%"}
      >
        {currentTabType === "scene" && <SceneGraph />}
      </Pane>
      <Pane
        className="flex justify-center items-center flex-shrink p-2"
        minSize={30}
        maxSize="80%"
      >
        <ResourceGraph />
      </Pane>
    </SplitPane>
  );
};
