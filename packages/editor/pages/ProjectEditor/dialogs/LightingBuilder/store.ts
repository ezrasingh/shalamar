import * as THREE from "three";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  DEFAULT_MATERIAL,
  DEFAULT_LIGHT,
  DEFAULT_MATERIAL_COLOR,
} from "./helpers";
import { hexColorToInt } from "@editor/common/helpers";

export interface LightingBuilderState {
  color: string;
  intensity: number;
  material: THREE.Material;
  object: THREE.Light;
}

export interface LightingBuilderActions {
  clearState: () => void;
  setColor: (color: string) => void;
  setIntensity: (intensity: number) => void;
  setLight: (light: THREE.Light) => void;
  setMaterial: (material: THREE.Material) => void;
}

export const useLightingBuilder = create(
  immer<LightingBuilderState & LightingBuilderActions>((set) => ({
    color: "#ffffff",
    intensity: 1,
    material: DEFAULT_MATERIAL.clone(),
    object: DEFAULT_LIGHT.clone(),
    clearState() {
      set((state) => {
        state.color = "#ffffff";
        state.intensity = 1;
        state.material = DEFAULT_MATERIAL.clone();
        state.object = DEFAULT_LIGHT.clone();
      });
    },
    setColor(color) {
      set((state) => {
        state.color = color;
        state.object.color = new THREE.Color(hexColorToInt(color));
      });
    },
    setIntensity(intensity) {
      set((state) => {
        state.intensity = intensity;
        state.object.intensity = intensity;
      });
    },
    setLight(light) {
      set((state) => {
        state.object = light;
      });
    },
    setMaterial(material) {
      set((state) => {
        // @ts-ignore
        if (material?.color) material.color.setHex(DEFAULT_MATERIAL_COLOR);
        state.material = material;
      });
    },
  }))
);
