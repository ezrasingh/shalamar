import type { ProjectConfig } from "@engine/userConfig";
import type { Project } from "@editor/common/services/database";
import { Link, useLocation } from "wouter";
import { useProjectEditor } from "@editor/pages/ProjectEditor/store";
import { AddIcon } from "@editor/common/icons";
import { ProjectSummary } from "../blocks";
import { useMemo } from "react";

export interface HomeProps {
  projects: Project[];
}

export const Home: React.FC<HomeProps> = ({ projects }) => {
  const [_, redirect] = useLocation();
  const editor = useProjectEditor((state) => ({
    openProject: state.openProject,
  }));
  const cards = useMemo(
    () =>
      projects?.map(({ id, configData }) => {
        const config: ProjectConfig = JSON.parse(configData);
        return (
          <ProjectSummary
            key={id}
            config={config}
            handleClick={() => {
              editor.openProject(config);
              redirect("/editor");
            }}
          />
        );
      }),
    [projects]
  );
  return (
    <div className="flex flex-col mx-32">
      <header className="flex-grow flex justify-between items-center px-32 py-4">
        <h1 className="text-4xl font-bold capitalize">projects</h1>
        <Link to="/projects/create">
          <button className="btn btn-circle btn-info">
            <AddIcon />
          </button>
        </Link>
      </header>
      <div className="divider mt-0" />
      {cards}
    </div>
  );
};
