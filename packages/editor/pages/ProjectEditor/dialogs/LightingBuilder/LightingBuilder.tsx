import { Dialog } from "@editor/pages/ProjectEditor/blocks";
import { Builder } from "./partials";
import { useEngine } from "@engine/store";
import { useLightingBuilder } from "./store";

export const LightingBuilder = () => {
  const engine = useEngine((state) => ({
    addObject: state.addObject,
  }));
  const lightingBuilder = useLightingBuilder((state) => ({
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
            engine.addObject(lightingBuilder.object);
            lightingBuilder.clearState();
            closeDialog();
          },
        }),
      }}
    >
      <Builder />
    </Dialog>
  );
};

export default LightingBuilder;
