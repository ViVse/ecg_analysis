import { Field } from "formik";

const FormField = ({
  className,
  label,
  name,
  errors,
  touched,
  fieldProps,
  children,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <Field
        className={`border py-3 px-4 mt-2 outline-none focus:border-neutral-500 ${
          errors && touched ? "border-red-600" : "border-neutral-300"
        }`}
        name={name}
        {...fieldProps}>
        {children}
      </Field>
      {errors && touched ? (
        <span className="text-red-600">{errors}</span>
      ) : null}
    </div>
  );
};

export default FormField;
