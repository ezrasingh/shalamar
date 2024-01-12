import cx from "classnames";
import { Redirect } from "wouter";
import { useProjectEditor } from "../store";
import { TabWindow } from "../blocks";
import { AddIcon } from "@editor/common/icons";
import { useEffect } from "react";
import { Tab, BASE_TAB_CLASS } from "../components";

export const TabManager = () => {
  const editor = useProjectEditor((state) => ({
    ui: state.ui,
    tabs: Array.from(state.ui.tabs.entries()),
    project: state.project,
    openTab: state.openTab,
    closeTab: state.closeTab,
  }));
  const openHomeTab = () => editor.openTab("Home", "empty");

  useEffect(() => {
    if (editor.project) openHomeTab();
  }, []); // ? only run once on mount

  if (!editor.project) return <Redirect to="/projects" />;

  const tabs = editor.tabs.map(([id, { type }]) => (
    <Tab
      key={id}
      active={editor.ui.activeTab?.id === id}
      onClose={() => editor.closeTab(id)}
      onClick={() => editor.openTab(id, type)}
      {...{ id, type }}
    />
  ));

  return (
    <div className="flex flex-col h-full w-full">
      <div className="tabs flex-shrink bg-gray-800 shadow-lg">
        {tabs}
        <a
          onClick={openHomeTab}
          className={cx(BASE_TAB_CLASS, "btn-success", "pt-4", "pb-8")}
        >
          <AddIcon />
        </a>
      </div>
      <div className="flex-grow">
        <TabWindow project={editor.project} tab={editor.ui.activeTab} />
      </div>
    </div>
  );
};
