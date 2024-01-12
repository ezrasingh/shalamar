export interface StatProps {
  title: string;
  value: number;
}

export const Stat: React.FC<StatProps> = ({ title, value }) => {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};
