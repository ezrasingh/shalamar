import { useState } from "react";
import { Redirect } from "wouter";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { useProjectEditor } from "../store";
import { SideMenu, TabManager } from "./";

export const Dashboard = () => {
  const editor = useProjectEditor((state) => ({
    project: state.project,
  }));
  const [editorPaneSizes, setEditorPaneSizes] = useState<
    Array<string | number>
  >(["15%", "100%"]);
  const handleSashRender = (_: number, active: boolean) => (
    <SashContent active={active} type="vscode" />
  );
  if (!editor.project) return <Redirect to="/projects" />;
  return (
    <SplitPane
      split="vertical"
      className="flex flex-row flex-grow"
      sizes={editorPaneSizes}
      onChange={setEditorPaneSizes}
      sashRender={handleSashRender}
    >
      <Pane
        className="flex-shrink bg-base-500 border-r border-slate-500"
        minSize={96}
        maxSize="30%"
      >
        <header className="text-center select-none">
          <h2 className="text-sm font-bold uppercase">{editor.project.name}</h2>
        </header>
        <SideMenu />
      </Pane>
      <Pane>
        <TabManager />
      </Pane>
    </SplitPane>
  );
};
