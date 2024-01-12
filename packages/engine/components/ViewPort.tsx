import cx from "classnames";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import { SceneRoot } from "./SceneRoot";
import { useEngine } from "../services/store";
import { SystemOptions } from "../hooks/useSystem";
import { SceneHelpers, SceneHelpersProps } from "./SceneHelpers";

export interface ViewPortProps {
  className?: string;
  debug: SceneHelpersProps;
  systemOptions?: SystemOptions;
}

export const ViewPort: React.FC<ViewPortProps> = ({
  className,
  debug,
  systemOptions,
}) => {
  const canvasProps = useEngine((state) => state.viewport);
  const rootRef = useRef<Group>(null);

  return (
    <Canvas className={cx("h-screen", "w-screen", className)} {...canvasProps}>
      <Suspense>
        <SceneHelpers {...debug} />
        <SceneRoot ref={rootRef} {...systemOptions?.hooks} />
      </Suspense>
    </Canvas>
  );
};
