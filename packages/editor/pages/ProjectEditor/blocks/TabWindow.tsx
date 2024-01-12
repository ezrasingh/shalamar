import { ProjectConfig } from "@engine/userConfig";
import { TabVariants } from "../store";
import { TabEmptyState } from "../partials";
import { SceneEditor } from "./SceneEditor";
export interface TabWindowProps {
  project: ProjectConfig;
  tab?: {
    id: string;
    type: TabVariants;
  };
}

export const TabWindow: React.FC<TabWindowProps> = ({ project, tab }) => {
  if (tab?.type === "scene") {
    const scene = project.scenes[tab.id];
    if (!scene) return <></>; // ! error msg scene not found
    return <SceneEditor />;
  }
  return <TabEmptyState project={project} />;
};
