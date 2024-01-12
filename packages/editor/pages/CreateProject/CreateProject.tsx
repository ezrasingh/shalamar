import { Suspense } from "react";
import { Loading } from "@editor/common/components";
import { NewProjectForm } from "./partials";

export const CreateProject = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NewProjectForm />
    </Suspense>
  );
};

export default CreateProject;
