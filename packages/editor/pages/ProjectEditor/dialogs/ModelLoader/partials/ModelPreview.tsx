import { PivotControls } from "@react-three/drei";
import { PreviewStage } from "@editor/pages/ProjectEditor/blocks";

export interface ModelPreviewProps {
  model: THREE.Object3D;
}

export const ModelPreview: React.FC<ModelPreviewProps> = ({ model }) => {
  return (
    <PreviewStage cameraZoom={1}>
      <PivotControls depthTest={false} lineWidth={2} anchor={[0, 0, 0]}>
        <primitive object={model} />
      </PivotControls>
    </PreviewStage>
  );
};
