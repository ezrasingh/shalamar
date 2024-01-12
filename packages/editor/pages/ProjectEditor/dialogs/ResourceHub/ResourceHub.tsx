import { Dialog } from "@editor/pages/ProjectEditor/blocks";
import { ResourceCards } from "./blocks";

export const ResourceHub = () => {
  return (
    <Dialog
      title="add resource"
      className="w-9/12"
      actions={{
        close: (closeDialog) => ({
          className: "btn btn-ghost outline capitalize",
          onClick: closeDialog,
        }),
      }}
    >
      <ResourceCards />
    </Dialog>
  );
};

export default ResourceHub;
