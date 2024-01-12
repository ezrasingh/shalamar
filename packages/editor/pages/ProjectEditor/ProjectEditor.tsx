import { Suspense } from "react";
import { Loading } from "@editor/common/components";
import { useHotKeys } from "./hooks";
import { Dashboard, DialogPortal } from "./partials";

export const ProjectEditor = () => {
  useHotKeys();
  return (
    <Suspense fallback={<Loading />}>
      <DialogPortal />
      <Dashboard />
    </Suspense>
  );
};

export default ProjectEditor;
