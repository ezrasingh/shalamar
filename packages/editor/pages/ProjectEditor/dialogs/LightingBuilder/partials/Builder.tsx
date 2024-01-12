import { BuilderSelection } from "@editor/pages/ProjectEditor/blocks";
import { ColorPicker } from "@editor/pages/ProjectEditor/components";
import { IntensitySlider, LightingPreview } from "../blocks";
import { useLightingBuilder } from "../store";
import { lightingBuilders, materialBuilders } from "../helpers";

export const Builder = () => {
  const lightingBuilder = useLightingBuilder();
  return (
    <div className="flex flex-row flex-shrink px-16">
      <div className="flex flex-col pl-8">
        <ColorPicker
          color={lightingBuilder.color}
          onChange={lightingBuilder.setColor}
        />
        <IntensitySlider
          intensity={lightingBuilder.intensity}
          onChange={lightingBuilder.setIntensity}
        />
        <BuilderSelection
          title="Light"
          builders={lightingBuilders}
          setBuilder={lightingBuilder.setLight}
          resource={lightingBuilder.object}
        />
        <BuilderSelection
          title="Material"
          builders={materialBuilders}
          setBuilder={lightingBuilder.setMaterial}
          resource={lightingBuilder.material}
        />
      </div>
      <div className="flex flex-grow justify-center items-center pl-8 pt-12">
        <LightingPreview
          light={lightingBuilder.object}
          material={lightingBuilder.material}
        />
      </div>
    </div>
  );
};
