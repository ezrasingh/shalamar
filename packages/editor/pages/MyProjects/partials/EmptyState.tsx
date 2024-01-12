import { Link } from "wouter";

export const EmptyState = () => {
  return (
    <div className="hero h-full bg-base-400">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold capitalize">
            create your first project
          </h1>
          <p className="py-6">Configure your project to begin</p>
          <Link to="/projects/create" className="btn btn-primary capitalize">
            get started
          </Link>
        </div>
      </div>
    </div>
  );
};
