import { useProjectEditor } from "@editor/pages/ProjectEditor/store";
import { Card } from "../components";
import { resourceCards } from "../helpers";

export const ResourceCards = () => {
  const editor = useProjectEditor((state) => ({
    openDialog: state.openDialog,
  }));
  return (
    <div className="grid grid-cols-3 gap-16">
      {resourceCards.map(({ dialog, ...props }, index) => (
        <Card
          key={index}
          {...props}
          onClick={() => editor.openDialog(dialog)}
        />
      ))}
    </div>
  );
};
