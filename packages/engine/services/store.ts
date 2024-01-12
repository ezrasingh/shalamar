import { create } from "zustand";
import { ProjectConfig } from "../userConfig";
import { immer } from "zustand/middleware/immer";
import { CanvasProps } from "@react-three/fiber";
import { Object3D } from "three";
import { deserializeScene } from "../helpers";

export interface State {
  scene?: Object3D;
  viewport: Omit<CanvasProps, "children">;
  objects: Map<number, Object3D>;
  scripts: Map<string, unknown>;
}

export interface Actions {
  bindScene: (scene: Object3D | undefined) => void;
  reorderScene: (
    changes: { id: number | string; parent: number | string }[]
  ) => void;
  loadConfig: (config: ProjectConfig, sceneKey: string) => void;
  getObject: (id?: number) => Object3D | undefined;
  addObject: (object: Object3D) => void;
  removeObject: (id: number) => void;
}

export const useEngine = create(
  immer<State & Actions>((set, get) => ({
    scene: undefined,
    viewport: {},
    objects: new Map(),
    scripts: new Map(),
    bindScene(scene) {
      set((state) => {
        state.scene = scene;
      });
    },
    loadConfig(config, sceneKey) {
      const { children } = deserializeScene(config.scenes[sceneKey]?.data);
      set((state) => {
        if (state.scene) {
          state.scene.clear();
          for (const child of children) {
            state.scene.add(child);
          }
        }
      });
    },
    getObject(id) {
      if (!id) return undefined;
      return get().scene?.getObjectById(id);
    },
    addObject(object) {
      set((state) => {
        if (state.scene) {
          state.scene.add(object);
          state.objects.set(object.id, object);
        }
      });
    },
    removeObject(id) {
      set((state) => {
        const object = state.objects.get(id);
        if (object) {
          object.removeFromParent();
          state.objects.delete(object.id);
        }
      });
    },
    reorderScene(changes) {
      set((state) => {
        if (state.scene) {
          for (const { id, parent: nextParentId } of changes) {
            const object = state.scene.getObjectById(+id);
            if (object) {
              // ? no changes continue loop
              if (object.parent?.id === nextParentId) continue;
              // ? move object to scene root
              if (nextParentId === 0) {
                object.removeFromParent();
                state.scene.add(object);
              }
              // ? move object to next parent
              const nextParent = state.scene.getObjectById(+nextParentId);
              if (nextParent) {
                object.removeFromParent();
                nextParent.add(object);
              }
            }
          }
        }
      });
    },
  }))
);
