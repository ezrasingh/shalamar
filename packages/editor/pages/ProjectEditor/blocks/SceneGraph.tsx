import cx from "classnames";
import { useCallback, useMemo } from "react";
import { NodeModel, NodeRender, Tree } from "@minoru/react-dnd-treeview";
import { useEngine } from "@engine/store";
import { useProjectEditor } from "../store";
import { NodeClosedIcon, NodeOpenedIcon } from "@editor/common/icons";
import { GraphNode, GraphNodeProps } from "../components";

function computeSceneTree(objects: Map<number, THREE.Object3D>): NodeModel[] {
  const nodes: NodeModel[] = [];
  for (const object of objects.values()) {
    nodes.push({
      id: object.id,
      parent: object.parent?.id ?? 0,
      text: object.name !== "" ? object.name : object.type,
    });
  }
  return nodes;
}

export const SceneGraph: React.FC = () => {
  const engine = useEngine((state) => ({
    scene: state.scene,
    objects: state.objects,
    getObject: state.getObject,
    removeObject: state.removeObject,
    reorderScene: state.reorderScene,
  }));
  const editor = useProjectEditor((state) => ({
    selected: state.debug.selected,
    selectNode: state.selectNode,
    clearSelection: state.clearSelection,
  }));
  const tree = useMemo(
    () => computeSceneTree(engine.objects),
    [engine.objects]
  );
  const treeNodes = useCallback<NodeRender<unknown>>(
    (node, { depth, isOpen, onToggle }) => {
      const handleClick: GraphNodeProps["onClick"] = () => {
        const object = engine.getObject(+node.id);
        if (object) editor.selectNode(object);
      };
      const popupMenuOptions = {
        copy: () => {},
        paste: () => {},
        delete: () => {
          engine.removeObject(+node.id);
          editor.clearSelection();
        },
        "add child": () => {},
      };
      return (
        <GraphNode
          className={cx({
            "font-light": editor.selected?.id !== +node.id,
            "font-medium": editor.selected?.id === +node.id,
          })}
          icons={{ isOpen: NodeOpenedIcon, isClosed: NodeClosedIcon }}
          {...{
            node,
            depth,
            isOpen,
            onToggle,
            onClick: handleClick,
            popupMenuOptions,
          }}
        />
      );
    },
    [engine.getObject, editor.selected]
  );

  return (
    <div className="flex flex-col container h-full p-2">
      <form className="flex flex-row flex-shrink">
        <input
          type="text"
          placeholder="Filter Nodes"
          className="input input-bordered input-info input-sm ml-1 flex-grow min-w-0 font-light text-center"
        />
      </form>
      <header className="divider my-2 select-none">
        <h2 className="text-xs uppercase">scene</h2>
      </header>
      <div className="flex-shrink">
        <Tree
          rootId={engine.scene?.id ?? 0}
          tree={tree}
          onDrop={engine.reorderScene}
          render={treeNodes}
        />
      </div>
      {/** spacer */}
      <div className="flex-grow" onClick={editor.clearSelection} />
    </div>
  );
};
