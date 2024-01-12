import { Object3D } from "three";
import {
  Stats,
  OrbitControls,
  Grid,
  TransformControls,
  TransformControlsProps,
} from "@react-three/drei";
import { RenderCallback, useFrame } from "@react-three/fiber";
export interface SceneHelpersProps {
  showStats?: boolean;
  transform?: Pick<
    TransformControlsProps,
    "mode" | "showX" | "showY" | "showZ"
  >;
  orbitControls?: boolean;
  infiniteGrid?: boolean;
  selected?: Object3D;
  statsContainer?: React.RefObject<HTMLElement>;
  onTransformChange?: (object: Object3D) => void;
  onFrameRender?: RenderCallback;
}

export const SceneHelpers: React.FC<SceneHelpersProps> = ({
  selected,
  showStats,
  transform,
  infiniteGrid,
  orbitControls,
  statsContainer,
  onTransformChange = () => {},
  onFrameRender = () => {},
}) => {
  useFrame(onFrameRender);
  return (
    <>
      {showStats && <Stats parent={statsContainer} />}
      {infiniteGrid && <Grid infiniteGrid position={[0, -0.5, 0]} />}
      {orbitControls && <OrbitControls makeDefault />}
      {transform && selected && (
        <TransformControls
          onChange={() => onTransformChange(selected)}
          object={selected}
          {...transform}
        />
      )}
    </>
  );
};
