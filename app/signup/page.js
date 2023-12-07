"use client";

import { Formik, Form } from "formik";
import { userValidation } from "@/validation/authValidation";
import FormField from "../components/ui/FormField";

export default function signUpPage() {
  return (
    <main className="min-h-screen flex justify-center pt-10">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={userValidation}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({ errors, touched }) => {
          return (
            <Form className="w-1/3">
              <h1 className="text-2xl font-semibold text-center mb-3">
                Registration
              </h1>
              <FormField
                label="Email"
                name="email"
                errors={errors.email}
                touched={touched.email}
              />
              <FormField
                className="mt-5"
                label="Password"
                name="password"
                errors={errors.password}
                touched={touched.password}
                fieldProps={{
                  type: "password",
                }}
              />
              <button
                className="mt-6 w-full text-lg px-8 py-2 bg-green-500 text-white"
                type="submit">
                Sign up
              </button>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
