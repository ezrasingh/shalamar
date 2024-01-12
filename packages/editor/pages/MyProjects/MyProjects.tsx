import { Suspense } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@editor/common/services/database";
import { Loading } from "@editor/common/components";
import { EmptyState, Home } from "./partials";

export const MyProjects = () => {
  const projects = useLiveQuery(() => db.projects.toArray());

  if (!projects) return <Loading />;
  if (!projects.length) return <EmptyState />;
  return (
    <Suspense fallback={<Loading />}>
      <Home projects={projects} />
    </Suspense>
  );
};

export default MyProjects;
