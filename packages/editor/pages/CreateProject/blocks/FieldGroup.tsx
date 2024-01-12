import cx from "classnames";

export interface FieldGroupProps extends React.PropsWithChildren {
  className?: string;
  title: string;
  titleClass?: string;
}

export const FieldGroup: React.FC<FieldGroupProps> = ({
  children,
  className,
  title,
  titleClass,
}) => {
  return (
    <fieldset className={cx("form-control", "w-full", "max-w-xs", className)}>
      <label className="label">
        <span className={cx("label-text-alt", "capitalize", titleClass)}>
          {title}
        </span>
      </label>
      {children}
    </fieldset>
  );
};
