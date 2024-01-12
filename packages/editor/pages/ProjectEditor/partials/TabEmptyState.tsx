import type { ProjectConfig } from "@engine/userConfig";
import { useZipBundler } from "@editor/common/hooks";
import { ResourceGroup } from "../blocks";
import { useProjectEditor } from "../store";
import { DialogKey } from "../dialogs";

export interface TabEmptyStateProps {
  project: ProjectConfig;
}

export const TabEmptyState: React.FC<TabEmptyStateProps> = ({ project }) => {
  const editor = useProjectEditor((state) => ({
    openTab: state.openTab,
    openDialog: state.openDialog,
  }));
  const downloadProject = useZipBundler(project);
  return (
    <div className="p-8">
      <header className="flex flex-row-reverse mb-4 px-4">
        <button className="btn btn-info capitalize" onClick={downloadProject}>
          download
        </button>
      </header>
      <ResourceGroup
        title="scenes"
        resource={project.scenes}
        cta="open scene"
        onClick={(id) => editor.openTab(id, "scene")}
        onCreate={() => editor.openDialog()}
      />
      <ResourceGroup
        title="models"
        resource={project.models}
        cta="view model"
        onClick={(id) => editor.openTab(id, "model")}
        onCreate={() => editor.openDialog(DialogKey.ModelLoader)}
      />
      <ResourceGroup
        title="animations"
        resource={project.animations}
        cta="view clips"
        onClick={(id) => editor.openTab(id, "animation")}
        onCreate={() => editor.openDialog()}
      />
      <ResourceGroup
        title="scripts"
        resource={project.scripts}
        cta="open in editor"
        onClick={(id) => editor.openTab(id, "script")}
        onCreate={() => editor.openDialog()}
      />
    </div>
  );
};
