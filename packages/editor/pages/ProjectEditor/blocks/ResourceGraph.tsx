import type { ProjectConfig } from "@engine/userConfig";
import { useCallback, useMemo } from "react";
import { Tree, NodeModel, NodeRender } from "@minoru/react-dnd-treeview";
import {
  FolderOpenedIcon,
  FolderClosedIcon,
  NodeOpenedIcon,
  NodeClosedIcon,
} from "@editor/common/icons";
import { TabVariants, useProjectEditor } from "../store";
import { GraphNode } from "../components";

interface ResourceNode {
  id: string;
  type: TabVariants;
}

function computeResourceTree(projectConfig?: ProjectConfig) {
  if (!projectConfig) return [];
  const tree: NodeModel<ResourceNode>[] = [];
  function addToTree(group: string, resource: object, type: TabVariants) {
    const groupId = tree.length + 1;
    tree.push({
      id: groupId,
      parent: 0,
      text: group,
    });
    for (const resourceKey of Object.keys(resource)) {
      tree.push({
        id: tree.length + 1,
        parent: groupId,
        text: resourceKey,
        data: { id: resourceKey, type },
      });
    }
  }
  addToTree("Animations", projectConfig.animations, "animation");
  addToTree("Models", projectConfig.models, "model");
  addToTree("Scenes", projectConfig.scenes, "scene");
  addToTree("Scripts", projectConfig.scripts, "script");
  return tree;
}

const folderIcons = {
  isOpen: FolderOpenedIcon,
  isClosed: FolderClosedIcon,
};
const resourceIcons = {
  isOpen: NodeOpenedIcon,
  isClosed: NodeClosedIcon,
};

export const ResourceGraph: React.FC = () => {
  const editor = useProjectEditor((state) => ({
    project: state.project,
    openTab: state.openTab,
  }));
  const tree = useMemo<NodeModel<ResourceNode>[]>(
    () => computeResourceTree(editor.project),
    [editor.project]
  );
  const treeNodes = useCallback<NodeRender<ResourceNode>>(
    (node, { depth, isOpen, onToggle }) => {
      return (
        <GraphNode
          {...{ node, depth, isOpen, onToggle }}
          className="font-light"
          icons={node.data ? resourceIcons : folderIcons}
          onClick={() => {
            if (!node.data) return;
            const { id, type } = node.data;
            editor.openTab(id, type);
          }}
        />
      );
    },
    []
  );
  const handleDrop = () => {}; // ! intentional no-op
  return (
    <div className="container h-full p-2">
      <header className="divider py-2 my-2 my-2 select-none">
        <h2 className="text-xs uppercase">resources</h2>
      </header>
      <Tree
        tree={tree}
        rootId={0}
        onDrop={handleDrop}
        render={treeNodes}
        initialOpen
      />
    </div>
  );
};
