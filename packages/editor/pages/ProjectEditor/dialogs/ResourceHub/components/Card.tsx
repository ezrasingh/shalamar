export interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
  cta: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  cta,
  onClick,
}) => {
  return (
    <div className="card w-96 glass shadow-xl bg-gradient-to-r from-blue-800 to-indigo-900">
      <div className="card-body">
        <h2 className="card-title capitalize">{title}</h2>
        <p className="text-sm">{description}</p>
        <div className="card-actions justify-end my-4">
          <button
            className="btn btn-ghost capitalize shadow-xl outline"
            onClick={onClick}
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
};
