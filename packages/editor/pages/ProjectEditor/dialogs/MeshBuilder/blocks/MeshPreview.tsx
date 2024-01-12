import { Clone, PivotControls } from "@react-three/drei";
import { PreviewStage } from "@editor/pages/ProjectEditor/blocks";

export interface MeshPreviewProps {
  children: THREE.Object3D;
}

export const MeshPreview: React.FC<MeshPreviewProps> = ({ children }) => {
  return (
    <PreviewStage>
      <PivotControls depthTest={false} lineWidth={2} anchor={[0, 0, 0]}>
        <Clone
          position={[0, 1.2, 0]}
          object={children}
          castShadow
          receiveShadow
        />
      </PivotControls>
    </PreviewStage>
  );
};
