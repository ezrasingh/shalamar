import * as THREE from "three";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loadModel } from "./helpers";

export interface ModelLoaderState {
  file?: File;
  object: THREE.Object3D;
}

export interface ModelLoaderActions {
  setModelFile: (model: File) => Promise<void>;
  clearState: () => void;
}

export const useModelLoader = create(
  immer<ModelLoaderState & ModelLoaderActions>((set) => ({
    file: undefined,
    object: new THREE.Group(),
    clearState() {
      set((state) => {
        state.file = undefined;
        state.object = new THREE.Group();
      });
    },
    async setModelFile(modelFile) {
      if (modelFile instanceof File) {
        const model = await loadModel(modelFile);
        set((state) => {
          state.file = modelFile;
          state.object = model;
        });
      }
    },
  }))
);
