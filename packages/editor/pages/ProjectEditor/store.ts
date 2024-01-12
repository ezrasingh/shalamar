import type { SceneHelpersProps } from "@engine/components";
import type { ProjectConfig } from "@engine/userConfig";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { Object3D } from "three";
import { DialogKey } from "./dialogs";

enableMapSet();

export type TabVariants = "scene" | "script" | "model" | "animation" | "empty";

export type TabRegistry = Map<string, { type: TabVariants }>;

export interface ProjectEditorState {
  debug: Omit<SceneHelpersProps, "onTransformChange" | "onRenderFrame">;
  ui: {
    currentDialog?: DialogKey;
    activeTab?: { id: string; type: TabVariants };
    tabs: TabRegistry;
  };
  project?: ProjectConfig;
}

export interface ProjectEditorActions {
  openProject: (config: ProjectConfig) => void;
  closeProject: () => void;
  openDialog: (dialogKey?: DialogKey) => void;
  closeDialog: () => void;
  openTab: (id: string, type: TabVariants, autoSelect?: boolean) => void;
  closeTab: (id: string) => void;
  selectNode: (object: Object3D) => void;
  clearSelection: () => void;
  setTransformMode: (mode: "scale" | "translate" | "rotate") => void;
}

export const useProjectEditor = create(
  immer<ProjectEditorState & ProjectEditorActions>((set) => ({
    ui: {
      currentDialog: undefined,
      activeTab: undefined,
      tabs: new Map(),
    },
    project: undefined,
    debug: {
      showStats: true,
      infiniteGrid: true,
      orbitControls: true,
      transform: {
        mode: "translate",
        showX: true,
        showY: true,
        showZ: true,
      },
      selected: undefined,
    },
    openProject(config) {
      set((state) => {
        state.project = config;
      });
    },
    closeProject() {
      set((state) => {
        state.project = undefined;
      });
    },
    openDialog(dialogKey) {
      set((state) => {
        if (dialogKey) state.ui.currentDialog = dialogKey;
      });
    },
    closeDialog() {
      set((state) => {
        state.ui.currentDialog = undefined;
      });
    },
    openTab(id, type, autoSelect = true) {
      set((state) => {
        if (!state.ui.tabs.has(id)) state.ui.tabs.set(id, { type });
        if (autoSelect) state.ui.activeTab = { id, type };
      });
    },
    closeTab(id) {
      set((state) => {
        state.ui.tabs.delete(id);
        if (state.ui.activeTab?.id === id) {
          const { value: nextTab } = state.ui.tabs.entries().next();
          if (!nextTab) state.ui.activeTab = undefined;
          const [id, { type }] = nextTab;
          state.ui.activeTab = { id, type };
        }
      });
    },
    selectNode(object) {
      set((state) => {
        state.debug.selected = object;
      });
    },
    clearSelection() {
      set((state) => {
        state.debug.selected = undefined;
      });
    },
    setTransformMode(mode) {
      set((state) => {
        if (!state.debug.transform) return;
        state.debug.transform.mode = mode;
      });
    },
  }))
);
