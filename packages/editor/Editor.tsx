import {
  DndProvider,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { Router, Route, Switch, Redirect } from "wouter";
import { Navbar } from "@editor/common/partials";
import { CreateProject, MyProjects, ProjectEditor } from "@editor/pages";

export default () => {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Router>
        <div className="flex flex-col h-screen w-screen overflow-auto">
          <Navbar />
          <Switch>
            <Route path="/projects/create" component={CreateProject} />
            <Route path="/projects" component={MyProjects} />
            <Route path="/editor" component={ProjectEditor} />
            <Route>
              <Redirect to="/projects" />
            </Route>
          </Switch>
        </div>
      </Router>
    </DndProvider>
  );
};
