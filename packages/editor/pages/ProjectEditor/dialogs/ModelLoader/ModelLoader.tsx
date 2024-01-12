import { Suspense } from "react";
import { Loading } from "@editor/common/components";
import { Dialog } from "@editor/pages/ProjectEditor/blocks";
import { EmptyState, ModelPreview } from "./partials";
import { useEngine } from "@engine/store";
import { useModelLoader } from "./store";

export const ModelLoader = () => {
  const engine = useEngine((state) => ({
    addObject: state.addObject,
  }));
  const modelLoader = useModelLoader();

  return (
    <Dialog
      title="model loader overflow-hidden"
      className="w-1/2"
      actions={{
        close: (closeDialog) => ({
          className: "btn btn-ghost outline capitalize",
          onClick: () => {
            modelLoader.clearState();
            closeDialog();
          },
        }),
        "add to project": (closeDialog) => ({
          type: "submit",
          className: "btn btn-info capitalize mx-2",
          disabled: modelLoader.file === undefined,
          onClick: () => {
            if (modelLoader.file) {
              // ! this should serialize asset into the project config & store in indexDB
              // ! then engine should be able to load asset from indexDB URL
              engine.addObject(modelLoader.object);
              modelLoader.clearState();
              closeDialog();
            }
          },
        }),
      }}
    >
      <Suspense fallback={<Loading />}>
        <div
          className="flex flex-col justify-center items-center m-12"
          style={{ height: "32rem" }}
        >
          {modelLoader.file ? (
            <ModelPreview model={modelLoader.object} />
          ) : (
            <EmptyState onChange={modelLoader.setModelFile} />
          )}
        </div>
      </Suspense>
    </Dialog>
  );
};

export default ModelLoader;
