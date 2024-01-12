import { useCallback, useMemo } from "react";
import { NodeModel, NodeRender, Tree } from "@minoru/react-dnd-treeview";
import { preventDefault } from "@editor/common/helpers";
import { ContentWrapper } from "@editor/common/components";
import { BuilderSelectionNode } from "../components";

export interface BuilderSelectionProps<T = any> {
  builders: { [group: string]: { [factory: string]: T } };
  title: string;
  resource: T;
  setBuilder: React.Dispatch<React.SetStateAction<T | undefined>>;
}

function computeTreeNodes(
  builders: BuilderSelectionProps["builders"]
): NodeModel[] {
  const nodes: NodeModel[] = [];
  for (const [groupName, factories] of Object.entries(builders)) {
    const groupdId = nodes.length + 1;
    nodes.push({
      id: groupdId,
      parent: 0,
      text: groupName,
      droppable: false,
    });
    for (const [factoryName, factory] of Object.entries(factories)) {
      nodes.push({
        id: nodes.length + 1,
        parent: groupdId,
        text: factoryName,
        data: factory,
        droppable: false,
      });
    }
  }
  return nodes;
}

export const BuilderSelection: React.FC<BuilderSelectionProps> = ({
  builders,
  title,
  resource,
  setBuilder,
}) => {
  const tree = useMemo(() => computeTreeNodes(builders), [builders]);
  const treeNodes = useCallback<NodeRender<any>>(
    (node, { depth, onToggle }) => {
      const handleClick = preventDefault(() => {
        if (!node.data) return;
        const ObjectResource = node.data;
        setBuilder(new ObjectResource());
      });
      return (
        <BuilderSelectionNode {...{ node, depth, onToggle, handleClick }} />
      );
    },
    [setBuilder]
  );
  return (
    <ContentWrapper
      title={title.concat(resource ? ` (${resource.type})` : "")}
      className="outline outline-1 rounded shadow-lg"
    >
      <Tree
        initialOpen
        tree={tree}
        rootId={0}
        onDrop={() => {}}
        render={treeNodes}
      />
    </ContentWrapper>
  );
};
