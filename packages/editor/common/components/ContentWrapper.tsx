import cx from "classnames";

export interface ContentWrapperProps extends React.PropsWithChildren {
  title?: string;
  containerClass?: string;
  className?: string;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  title,
  children,
  containerClass,
  className,
}) => {
  return (
    <div
      className={cx(
        "flex",
        "flex-col",
        "flex-grow",
        "container",
        "min-w-64",
        "max-h-64",
        containerClass
      )}
    >
      {title && (
        <header className="my-4">
          <h3 className="text-lg font-bold capitalize select-none">{title}</h3>
        </header>
      )}
      <div className={cx("flex-shrink", "overflow-auto", className)}>
        {children}
      </div>
    </div>
  );
};
