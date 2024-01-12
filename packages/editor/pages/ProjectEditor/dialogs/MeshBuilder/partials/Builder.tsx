import { BuilderSelection } from "@editor/pages/ProjectEditor/blocks";
import { ColorPicker } from "@editor/pages/ProjectEditor/components";
import { MeshPreview } from "../blocks";
import { useMeshBuilder } from "../store";
import { geometryBuilders, materialBuilders } from "../helpers";

export const Builder = () => {
  const meshBuilder = useMeshBuilder();
  return (
    <div className="flex flex-row flex-shrink px-16">
      <div className="flex flex-col pl-8">
        <ColorPicker
          color={meshBuilder.color}
          onChange={meshBuilder.setColor}
        />
        <BuilderSelection
          title="Geometry"
          builders={geometryBuilders}
          setBuilder={meshBuilder.setGeometry}
          resource={meshBuilder.geometry}
        />
        <BuilderSelection
          title="Material"
          builders={materialBuilders}
          setBuilder={meshBuilder.setMaterial}
          resource={meshBuilder.material}
        />
      </div>
      <div className="flex flex-grow justify-center items-center pl-8 pt-12">
        <MeshPreview>{meshBuilder.object}</MeshPreview>
      </div>
    </div>
  );
};
