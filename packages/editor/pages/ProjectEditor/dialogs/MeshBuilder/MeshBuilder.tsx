import { Dialog } from "@editor/pages/ProjectEditor/blocks";
import { Builder } from "./partials";
import { useEngine } from "@engine/store";
import { useMeshBuilder } from "./store";

export const MeshBuilder = () => {
  const engine = useEngine((state) => ({
    addObject: state.addObject,
  }));
  const meshBuilder = useMeshBuilder((state) => ({
    object: state.object,
    clearState: state.clearState,
  }));

  return (
    <Dialog
      className="w-9/12"
      actions={{
        close: (closeDialog) => ({
          className: "btn btn-ghost outline capitalize mx-2",
          onClick: closeDialog,
        }),
        "add to scene": (closeDialog) => ({
          type: "submit",
          className: "btn btn-info capitalize mx-2",
          onClick: () => {
            engine.addObject(meshBuilder.object);
            meshBuilder.clearState();
            closeDialog();
          },
        }),
      }}
    >
      <Builder />
    </Dialog>
  );
};

export default MeshBuilder;
