import { useLocation } from "wouter";
import {
  useCreateProjectForm,
  createProject,
  FrameLoopChoices,
} from "../helpers";
import { FieldGroup, Form } from "../blocks";

export const NewProjectForm = () => {
  const [_, redirect] = useLocation();
  const { formState, inputs, handleSubmit } = useCreateProjectForm();
  return (
    <Form
      title="create project"
      subtitle="Add your project details and configure the viewport."
      cta="start project"
      state={formState}
      onSubmit={handleSubmit(async (input) => {
        await createProject(input);
        redirect("/projects");
      })}
    >
      <FieldGroup title="project" titleClass="text-lg">
        <input
          type="text"
          {...inputs.projectName}
          autoFocus
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </FieldGroup>
      <FieldGroup
        title="viewport settings"
        titleClass="text-lg"
        className="my-4"
      >
        <FieldGroup title="device pixel ratio" className="my-2">
          <div className="flex flex-row justify-around">
            <input
              type="number"
              {...inputs.rendererDprMin}
              className="input input-bordered input-primary w-1/2 max-w-xs mr-2"
              step={1}
              min={1}
            />
            <div className="divider divider-vetical select-none">:</div>
            <input
              type="number"
              {...inputs.rendererDprMax}
              className="input input-bordered input-primary w-1/2 max-w-xs ml-2"
              step={1}
              min={1}
            />
          </div>
        </FieldGroup>
        <FieldGroup title="frame loop" className="my-2">
          <select
            {...inputs.rendererFrameloop}
            className="select select-primary w-full max-w-xs"
            defaultValue={FrameLoopChoices.Always}
          >
            <option value={FrameLoopChoices.Always}>Every Frame</option>
            <option value={FrameLoopChoices.OnDemand}>On Demand</option>
            <option value={FrameLoopChoices.Never}>Never</option>
          </select>
        </FieldGroup>
        <FieldGroup title="renderer flags" className="my-2">
          <label className="label cursor-pointer">
            <span className="label-text capitalize">enable shadows</span>
            <input
              type="checkbox"
              {...inputs.rendererEnableShadows}
              className="checkbox checkbox-info"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text capitalize">
              enable flat-tone mapping
            </span>
            <input
              type="checkbox"
              {...inputs.rendererEnableFlatTones}
              className="checkbox checkbox-info"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text capitalize">
              use orthographic camera
            </span>
            <input
              type="checkbox"
              {...inputs.rendererUseOrthographic}
              className="checkbox checkbox-info"
            />
          </label>
        </FieldGroup>
      </FieldGroup>
    </Form>
  );
};
