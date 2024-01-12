import { PreviewStage } from "@editor/pages/ProjectEditor/blocks";

export interface LightPreviewProps {
  light: THREE.Object3D;
  material: THREE.Material;
}

export const LightingPreview: React.FC<LightPreviewProps> = ({
  light,
  material,
}) => {
  return (
    <PreviewStage lightIntensity={0}>
      <group position={[1, 2, 3]}>
        <primitive object={light} />
      </group>
      <mesh position={[0, 0, 0]} material={material} receiveShadow castShadow>
        <boxGeometry />
      </mesh>
    </PreviewStage>
  );
};
