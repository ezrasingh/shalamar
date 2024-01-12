import type { FormState } from "react-hook-form";
import type { FormInputs } from "../helpers";
import { useMemo } from "react";
import { Notifcation } from "../components";

export interface FormProps extends React.PropsWithChildren {
  cta: string;
  title: string;
  subtitle: string;
  state: FormState<FormInputs>;
  onSubmit: React.DOMAttributes<HTMLFormElement>["onSubmit"];
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  state: formState,
  subtitle,
  title,
  cta,
}) => {
  const notifcations = useMemo(() => {
    if (!formState.isSubmitted) return <></>;
    return Object.entries(formState.errors).map(
      ([field, error]) =>
        error.message && <Notifcation key={field} message={error.message} />
    );
  }, [formState]);
  return (
    <form
      className="flex flex-col h-full justify-start items-center px-64 py-8"
      onSubmit={onSubmit}
    >
      <header className="max-w-md my-4 text-center">
        <h3 className="text-lg font-medium capitalize">{title}</h3>
        <p className="my-2 text-md">{subtitle}</p>
        <div className="divider" />
      </header>
      {notifcations}
      {children}
      <button
        type="submit"
        className="btn btn-lg btn-success rounded-lg mt-4 capitalize"
      >
        {cta}
      </button>
    </form>
  );
};
