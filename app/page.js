"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Formik, Form } from "formik";
import ChartComponent from "./components/ui/Chart";
import Spinner from "./components/ui/Spinner";
import { predictionValidation } from "@/validation/predictionValidation";
import FormField from "./components/ui/FormField";
import accuracyInfo from "@/const/networkInfo";

export default function Home() {
  const { data: session } = useSession();
  const [pred, setPred] = useState();
  const [anomalyType, setAnomalyType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(true);
  const fileRef = useRef();

  const submitHandler = (values) => {
    setIsChanging(false);
    setLoading(true);
    fetch(`/api/isAnomaly?data=${encodeURIComponent(values.data)}`)
      .then((res) => res.json())
      .then(async (data) => {
        setPred(data.isNormal);
        if (!data.isNormal) {
          const res = await fetch(
            `/api/typeAnomaly?data=${encodeURIComponent(values.data)}`
          );
          data = await res.json();
          setAnomalyType(data.type);
        }
      })
      .finally(() => setLoading(false));
  };

  const saveResultsHandler = async (patientName, data, prediction) => {
    const res = await fetch("api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientName,
        data,
        prediction,
        user: session.user.id,
      }),
    });
    if (res.ok) {
      alert("Prediction saved");
    } else {
      const errorData = await res.json();
      console.log(errorData.message);
    }
  };

  const readFile = (e, setData) => {
    if (!e.target.files) return;
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      setData(reader.result);
    };
  };

  return (
    <main className="flex justify-center pt-10">
      <Formik
        initialValues={{
          patientName: "",
          data: "",
        }}
        validationSchema={predictionValidation}
        onSubmit={submitHandler}>
        {({ errors, touched, values, setFieldValue }) => {
          return (
            <Form className="w-[600px] bg-white h-fit py-6 px-16 rounded-2xl">
              <h1 className="text-3xl font-bold mb-4">ECG anomaly detection</h1>
              <FormField
                label="Patient name:"
                name="patientName"
                errors={errors.patientName}
                touched={touched.patientName}
              />
              <FormField
                className="mt-5"
                label="Enter your data (as an array)"
                name="data"
                errors={errors.data}
                touched={touched.data}
              />
              <input
                type="file"
                ref={fileRef}
                className="hidden w-0"
                onChange={(e) => readFile(e, setFieldValue.bind(null, "data"))}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-black px-6 py-2 mt-3 text-white"
                  onClick={() => fileRef.current.click()}>
                  Upload data from file
                </button>
                <button
                  className="bg-black px-6 py-2 mt-3 text-white"
                  type="submit">
                  Submit
                </button>
              </div>
              {loading && (
                <div className="flex justify-center mt-6">
                  <Spinner />
                </div>
              )}
              {!loading &&
                !isChanging &&
                pred !== undefined &&
                pred !== null && (
                  <div className="mt-5">
                    <ChartComponent data={JSON.parse(values.data)} />
                    <h2 className="mt-3 font-bold">Your prediction:</h2>
                    <p>
                      {pred === 0
                        ? `Anomaly detected (${accuracyInfo.anomaly}%)`
                        : `No anomaly detected (${accuracyInfo.normal}%)`}
                    </p>
                    {pred === 0 && (
                      <p>
                        Anomaly type: {anomalyType} ({accuracyInfo[anomalyType]}
                        %)
                      </p>
                    )}
                    {session && (
                      <button
                        type="button"
                        className="bg-black px-6 py-2 mt-3 text-white"
                        onClick={() => {
                          const predString =
                            pred === 0
                              ? `Anomaly detected (${accuracyInfo.anomaly}%). Anomaly type: ${anomalyType} (${accuracyInfo[anomalyType]}%)`
                              : `No anomaly detected (${accuracyInfo.normal}%)`;
                          saveResultsHandler(
                            values.patientName,
                            JSON.parse(values.data),
                            predString
                          );
                        }}>
                        Save results
                      </button>
                    )}
                  </div>
                )}
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
