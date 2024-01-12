import { LightingBuilder } from "./LightingBuilder";
import { MeshBuilder } from "./MeshBuilder";
import { ModelLoader } from "./ModelLoader";
import { ResourceHub } from "./ResourceHub";
import { DialogKey, DialogView } from "./helpers";

export const dialogRegistry: { [dialog in DialogKey]: DialogView } = {
  [DialogKey.LightingBuilder]: LightingBuilder,
  [DialogKey.MeshBuilder]: MeshBuilder,
  [DialogKey.ModelLoader]: ModelLoader,
  [DialogKey.ResourceHub]: ResourceHub,
};
