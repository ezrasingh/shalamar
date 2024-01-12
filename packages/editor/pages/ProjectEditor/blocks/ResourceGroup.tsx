import { AddIcon } from "@editor/common/icons";
import { useMemo } from "react";

export interface ResourceGroupProps {
  resource: object;
  title: string;
  cta: string;
  onClick: (resourceId: string) => void;
  onCreate: () => void;
}

export const ResourceGroup: React.FC<ResourceGroupProps> = ({
  resource,
  title,
  cta,
  onClick,
  onCreate,
}) => {
  const entries = Object.entries(resource);
  const cards = useMemo(() => {
    if (!entries.length)
      return (
        <div className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="capitalize">no {title}</span>
        </div>
      );
    return entries.map(([name /*, data */]) => (
      <div
        key={name}
        className="card card-side outline bg-base-400 shadow-xl w-1/4"
      >
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p></p>
          <div className="card-actions justify-end">
            <button
              onClick={() => onClick(name)}
              className="btn btn-primary capitalize"
            >
              {cta}
            </button>
          </div>
        </div>
      </div>
    ));
  }, [entries]);
  return (
    <section className="my-4 px-8">
      <header className="flex justify-between p-4">
        <h3 className="text-xl font-bold capitalize">{title}</h3>
        <button
          className="btn btn-primary btn-md btn-circle"
          onClick={onCreate}
        >
          <AddIcon />
        </button>
      </header>
      <div className="flex">{cards}</div>
    </section>
  );
};
