"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { userValidation } from "@/validation/authValidation";
import FormField from "../components/ui/FormField";

export default function signUpPage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (res.error) {
        setErrorMsg("Invalid credentials.");
        return;
      }
      router.replace("/");
    } catch (error) {
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center pt-10">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={userValidation}
        onSubmit={submitHandler}>
        {({ errors, touched }) => {
          return (
            <Form className="w-1/3">
              <h1 className="text-2xl font-semibold text-center mb-3">Login</h1>
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
              {errorMsg && <span className="text-red-600">{errorMsg}</span>}
              <button
                className="mt-6 w-full text-lg px-8 py-2 bg-green-500 text-white"
                disabled={isLoading}
                type="submit">
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
