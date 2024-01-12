import cx from "classnames";
import { useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useProjectEditor } from "@editor/pages/ProjectEditor/store";

const routes = new Map<string, string>();

routes.set("projects", "/projects");
routes.set("editor", "/editor");

export const Navbar = () => {
  const [location] = useLocation();
  const editor = useProjectEditor((state) => ({
    project: state.project,
    ui: state.ui,
  }));
  const buttons = useMemo(() => {
    const btns: JSX.Element[] = [];
    for (const [name, route] of routes) {
      const btnClass = cx("btn", "btn-md", "capitalize", "pt-4", {
        "btn-active": location.includes(route),
        "btn-disabled": name === "Editor" && editor.project === undefined,
      });
      btns.push(
        <li key={name}>
          <Link to={route}>
            <button className={btnClass}>{name}</button>
          </Link>
        </li>
      );
    }
    return btns;
  }, [routes, location, editor]);
  const shouldShowPlayBtn =
    location.includes("/editor") && editor.ui.activeTab?.type === "scene";
  return (
    <nav className="flex flex-shrink sticky top-0 z-10">
      <div className="navbar bg-base-200 min-h-8 h-12">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{buttons}</ul>
        </div>
        <div className="navbar-end">
          {shouldShowPlayBtn && (
            <button className="btn btn-sm btn-success my-2 capitalize">
              play
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
