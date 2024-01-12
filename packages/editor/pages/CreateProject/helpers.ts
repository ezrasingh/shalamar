import { useForm } from "react-hook-form";
import { createUserConfig } from "@engine/userConfig";
import db from "@editor/common/services/database";

export const enum FrameLoopChoices {
  Always = "always",
  OnDemand = "demand",
  Never = "never",
}

export interface FormInputs {
  projectName: string;
  rendererDprMin: number;
  rendererDprMax: number;
  rendererFrameloop: FrameLoopChoices;
  rendererEnableShadows: boolean;
  rendererEnableFlatTones: boolean;
  rendererUseOrthographic: boolean;
}

export function useCreateProjectForm() {
  const { handleSubmit, register, formState } = useForm<FormInputs>({
    defaultValues: {
      rendererDprMin: 1,
      rendererDprMax: 2,
      rendererFrameloop: FrameLoopChoices.Always,
      rendererEnableShadows: false,
      rendererEnableFlatTones: false,
      rendererUseOrthographic: false,
    },
  });
  const inputs = {
    projectName: register("projectName", { required: true }),
    rendererDprMin: register("rendererDprMin", { required: true, min: 1 }),
    rendererDprMax: register("rendererDprMax", { required: true, min: 1 }),
    rendererFrameloop: register("rendererFrameloop", { required: true }),
    rendererEnableShadows: register("rendererEnableShadows"),
    rendererEnableFlatTones: register("rendererEnableFlatTones"),
    rendererUseOrthographic: register("rendererUseOrthographic"),
  };
  return { formState, inputs, handleSubmit };
}

export async function createProject(inputs: FormInputs) {
  const config = createUserConfig(inputs.projectName, {
    dpr: [inputs.rendererDprMin, inputs.rendererDprMax],
    frameloop: inputs.rendererFrameloop,
    shadows: inputs.rendererEnableShadows,
    flat: inputs.rendererEnableFlatTones,
    orthographic: inputs.rendererUseOrthographic,
  });
  await db.projects.add({
    name: inputs.projectName,
    configData: JSON.stringify(config),
  });
}
