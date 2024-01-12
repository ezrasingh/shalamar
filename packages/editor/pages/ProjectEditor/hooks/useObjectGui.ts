import type { Schema } from "leva/dist/declarations/src/types";
import { folder, useControls } from "leva";
import { Euler, EulerOrder, Object3D } from "three";

export interface ObjectGuiOptions {
  stepSize?: number;
}

const DEFAULT_STEP_SIZE = 0.01;

function transformControlsBuilder(
  selected?: Object3D,
  options: ObjectGuiOptions = {}
): Schema {
  return {
    Position: {
      disabled: !selected,
      value: {
        x: selected?.position.x ?? 0,
        y: selected?.position.y ?? 0,
        z: selected?.position.z ?? 0,
      },
      step: options?.stepSize ?? DEFAULT_STEP_SIZE,
      onEditEnd: ({ x, y, z }) => {
        if (!selected) return;
        selected.position.x = x;
        selected.position.y = y;
        selected.position.z = z;
      },
    },
    Rotation: {
      disabled: !selected,
      value: {
        x: selected?.rotation.x ?? 0,
        y: selected?.rotation.y ?? 0,
        z: selected?.rotation.z ?? 0,
      },
      step: options?.stepSize ?? DEFAULT_STEP_SIZE,
      onEditEnd: ({ x, y, z }) => {
        if (!selected) return;
        selected.rotation.x = x;
        selected.rotation.y = y;
        selected.rotation.z = z;
      },
    },
    RotationOrder: {
      disabled: !selected,
      value: selected?.rotation.order ?? Euler.DEFAULT_ORDER,
      options: ["XYZ", "YXZ", "ZXY", "ZYX", "YZX", "XZY"] as EulerOrder[],
      onEditEnd: (order: EulerOrder) => {
        if (!selected) return;
        selected.rotation.order = order;
      },
    },
    Scale: {
      disabled: !selected,
      value: {
        x: selected?.scale.x ?? 1,
        y: selected?.scale.y ?? 1,
        z: selected?.scale.z ?? 1,
      },
      step: options?.stepSize ?? DEFAULT_STEP_SIZE,
      onEditEnd: ({ x, y, z }) => {
        if (!selected) return;
        selected.scale.x = x;
        selected.scale.y = y;
        selected.scale.z = z;
      },
    },
  };
}

export function useObjectGui(selected?: Object3D, options?: ObjectGuiOptions) {
  const [_, setControls] = useControls(
    () => ({
      Transform: folder(transformControlsBuilder(selected, options)),
    }),
    [selected, options]
  );

  return function updateGui(object?: Object3D) {
    setControls({
      // @ts-ignore - @leva/useControls typing is incorrect here
      Position: {
        x: object?.position.x ?? 0,
        y: object?.position.y ?? 0,
        z: object?.position.z ?? 0,
      },
      Rotation: {
        x: object?.rotation.x ?? 0,
        y: object?.rotation.y ?? 0,
        z: object?.rotation.z ?? 0,
      },
      RotationOrder: object?.rotation.order ?? Euler.DEFAULT_ORDER,
      Scale: {
        x: object?.scale.x ?? 1,
        y: object?.scale.y ?? 1,
        z: object?.scale.z ?? 1,
      },
    });
  };
}
