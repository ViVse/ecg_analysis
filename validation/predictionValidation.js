import * as Yup from "yup";

export const predictionValidation = Yup.object().shape({
  patientName: Yup.string().required("Patient name is required"),
  data: Yup.string().required("Data is required"),
});
