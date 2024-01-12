import { FileUploader } from "react-drag-drop-files";

const FILE_TYPES = ["FBX", "GLTF", "OBJ"];

export interface EmptyStateProps {
  onChange: (file: any) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onChange }) => {
  return (
    <FileUploader
      name="file"
      multiple={false}
      handleChange={onChange}
      types={FILE_TYPES}
    />
  );
};
