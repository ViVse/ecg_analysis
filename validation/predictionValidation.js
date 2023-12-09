import * as Yup from "yup";

Yup.addMethod(Yup.string, "stringifiedArray", function (errorMessage) {
  return this.test("test-stringified-array", errorMessage, function (value) {
    const { path, createError } = this;

    try {
      const arr = JSON.parse(value);
      return (
        (Array.isArray(arr) && arr.every((val) => val == +val)) ||
        createError({ path, message: errorMessage })
      );
    } catch (error) {
      return createError({ path, message: errorMessage });
    }
  });
});

export const predictionValidation = Yup.object().shape({
  patientName: Yup.string().required("Patient name is required"),
  data: Yup.string()
    .required("Data is required")
    .stringifiedArray("Data should be an array of numbers"),
});
