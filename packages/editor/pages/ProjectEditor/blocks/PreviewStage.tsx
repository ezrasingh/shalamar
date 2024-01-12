import { Center, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export interface PreviewStageProps extends React.PropsWithChildren {
  cameraZoom?: number;
  lightIntensity?: number;
}

export const PreviewStage: React.FC<PreviewStageProps> = ({
  children,
  cameraZoom = 2.5,
  lightIntensity = 1,
}) => {
  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={[1, 2]}
      className="rounded-xl shadow-lg"
    >
      <Stage
        intensity={lightIntensity}
        preset="rembrandt"
        shadows={{
          type: "accumulative",
          color: "skyblue",
          colorBlend: 2,
          opacity: 1,
        }}
        adjustCamera={cameraZoom}
        environment="city"
      >
        <Center>{children}</Center>
      </Stage>
      <OrbitControls makeDefault />
    </Canvas>
  );
};
