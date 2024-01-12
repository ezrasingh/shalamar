export interface CardProps extends React.PropsWithChildren {
  title: string;
  actions: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, actions, children }) => {
  return (
    <div className="card card-compact w-1/3 text-primary-content border shadow min-w-max">
      <div className="card-body text-center">
        <h2 className="card-title justify-center my-4">{title}</h2>
        {children}
        <div className="card-actions justify-center m-4 px-32">{actions}</div>
      </div>
    </div>
  );
};
