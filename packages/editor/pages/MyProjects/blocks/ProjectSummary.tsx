import { ProjectConfig } from "@engine/userConfig";
import { Card, Stat } from "../components";

export interface ProjectCardProps {
  config: ProjectConfig;
  handleClick: () => void;
}

export const ProjectSummary: React.FC<ProjectCardProps> = ({
  config,
  handleClick,
}) => {
  const { name, scenes, scripts, models, animations } = config;
  return (
    <Card
      title={name}
      actions={
        <>
          <button
            className="btn btn-info btn-outline capitalize"
            onClick={handleClick}
          >
            open in editor
          </button>
        </>
      }
    >
      <div className="stats shadow">
        <Stat title="Scene" value={Object.values(scenes).length} />
        <Stat title="Scripts" value={Object.values(scripts).length} />
      </div>
      <div className="stats shadow">
        <Stat
          /* w/o this the stat dividers wont line up in the UI because
           *   'Animations' is too long which causes the divider to get
           *   pushed to the left */
          title="&nbsp;&nbsp;Models&nbsp;&nbsp;&nbsp;&nbsp;"
          value={Object.values(models).length}
        />
        <Stat title="Animations" value={Object.values(animations).length} />
      </div>
    </Card>
  );
};
