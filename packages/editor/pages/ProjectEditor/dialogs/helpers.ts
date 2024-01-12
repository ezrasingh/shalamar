import type { DialogProps } from "@editor/pages/ProjectEditor/blocks";

export const enum DialogKey {
  ResourceHub = "ResourceHub",
  LightingBuilder = "LightingBuilder",
  MeshBuilder = "MeshBuilder",
  ModelLoader = "ModelLoader",
}

export type DialogView = React.FC<DialogProps>;
