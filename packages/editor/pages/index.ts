export * from "./CreateProject";
export * from "./MyProjects";
export * from "./ProjectEditor";

import loadableCreateProject from "./CreateProject/loadable";
import loadableMyProjects from "./MyProjects/loadable";
import loadableProjectEditor from "./ProjectEditor/loadable";

export const Loadable = {
  CreateProject: loadableCreateProject,
  MyProjects: loadableMyProjects,
  ProjectEditor: loadableProjectEditor,
};
