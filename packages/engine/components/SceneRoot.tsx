import type { Group } from "three";
import { forwardRef } from "react";
import { Select, CycleRaycast } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { SystemOptions, useSystem } from "../hooks/useSystem";

export interface SceneRootProps {
  onObjectClick?: SystemOptions["hooks"]["onObjectClick"];
  onObjectHover?: SystemOptions["hooks"]["onObjectHover"];
  onPointerMissed?: SystemOptions["hooks"]["onPointerMissed"];
}

export const SceneRoot = forwardRef<Group, SceneRootProps>((props, ref) => {
  const root = (ref as React.MutableRefObject<Group>) ?? undefined;
  const systemHooks = useSystem(root, {
    hooks: props,
  });

  return (
    <Physics colliders="hull">
      <Select
        onPointerDown={({ object }) => systemHooks.onClick(object)}
        onPointerMissed={systemHooks.onPointerMissed}
        multiple={false}
      >
        <group ref={ref} dispose={null}>
          <CycleRaycast
            preventDefault={false}
            onChanged={systemHooks.onHover}
          />
        </group>
      </Select>
    </Physics>
  );
});
