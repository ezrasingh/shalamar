import type { CardProps } from "./components";
import { DialogKey } from "../helpers";

export const resourceCards: Array<
  Omit<CardProps, "onClick"> & { dialog?: DialogKey }
> = [
  {
    title: "mesh",
    description:
      "Build a 3D object that combines a specific shape (geometry) with its visual attributes (material)",
    cta: "open builder",
    dialog: DialogKey.MeshBuilder,
  },
  {
    title: "model",
    description: "Bring your own 3D models into the scene ",
    cta: "open loader",
    dialog: DialogKey.ModelLoader,
  },
  {
    title: "lighting",
    description:
      "Illuminate the objects in your scene with the lighting component",
    cta: "open builder",
    dialog: DialogKey.LightingBuilder,
  },
  {
    title: "camera",
    description: "Explore and navigate your scene",
    cta: "open builder",
    dialog: undefined,
  },
  {
    title: "animation",
    description:
      "Load and apply animations to your models, bringing them to life with movement and action",
    cta: "open loader",
    dialog: undefined,
  },
  {
    title: "scripts",
    description:
      "Write your own code. You can customize interactions, create dynamic animations, and add unique functionalities",
    cta: "create",
    dialog: undefined,
  },
];
