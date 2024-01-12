import * as THREE from "three";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  objectFactory,
  DEFAULT_GEOMETRY,
  DEFAULT_MATERIAL,
  DEFAULT_MESH,
} from "./helpers";

export interface MeshBuilderState {
  color: string;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  object: THREE.Mesh;
}

export interface MeshBuilderActions {
  clearState: () => void;
  setColor: (color: string) => void;
  setGeometry: (geometry: THREE.BufferGeometry) => void;
  setMaterial: (material: THREE.Material) => void;
}

export const useMeshBuilder = create(
  immer<MeshBuilderState & MeshBuilderActions>((set) => ({
    color: "#ff0000",
    geometry: DEFAULT_GEOMETRY.clone(),
    material: DEFAULT_MATERIAL.clone(),
    object: DEFAULT_MESH.clone(),
    clearState() {
      set((state) => {
        state.color = "#ff0000";
        state.geometry = DEFAULT_GEOMETRY.clone();
        state.material = DEFAULT_MATERIAL.clone();
        state.object = DEFAULT_MESH.clone();
      });
    },
    setColor(color) {
      set((state) => {
        state.color = color;
        state.object = objectFactory(
          state.color,
          state.geometry,
          state.material
        );
      });
    },
    setGeometry(geometry) {
      set((state) => {
        state.geometry = geometry;
        state.object = objectFactory(
          state.color,
          state.geometry,
          state.material
        );
      });
    },
    setMaterial(material) {
      set((state) => {
        state.material = material;
        state.object = objectFactory(
          state.color,
          state.geometry,
          state.material
        );
      });
    },
  }))
);
