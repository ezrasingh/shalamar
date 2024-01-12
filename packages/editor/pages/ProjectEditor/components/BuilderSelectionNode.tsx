import type { NodeModel } from "@minoru/react-dnd-treeview";

export interface BuilderSelectionProps {
  depth: number;
  node: NodeModel;
  onToggle: () => void;
  handleClick: () => void;
}

export const BuilderSelectionNode: React.FC<BuilderSelectionProps> = ({
  depth,
  node,
  onToggle,
  handleClick,
}) => {
  return (
    <div
      style={{ marginLeft: depth * 10 }}
      className="flex flex-row items-center cursor-pointer"
    >
      <span className="mr-2" onClick={onToggle} />
      <span className="flex-grow my-1" onClick={onToggle}>
        {node.data ? (
          <button
            className="btn btn-xs btn-info btn-outline"
            onClick={handleClick}
          >
            {node.text}
          </button>
        ) : (
          <span className="capitalize">{node.text}</span>
        )}
      </span>
    </div>
  );
};
