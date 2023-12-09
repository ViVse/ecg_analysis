"use client";
import { useState } from "react";
import Chart from "./ui/Chart";

const Prediction = ({ pred }) => {
  const [showData, setShowData] = useState(false);

  return (
    <div className="border-2 border-solid border-green-700 rounded px-6 py-3 mb-6">
      <h1 className="text-lg font-medium">Prediction: {pred._id}</h1>
      <p>
        Date:{" "}
        {pred.createdAt
          .toString()
          .slice(0, 10)
          .replace(/-/g, ".")
          .split(".")
          .reverse()
          .join(".")}
      </p>
      <p>Patient: {pred.patientName}</p>
      <p>Prediction: {pred.prediction}</p>
      {showData && <Chart data={pred.data} />}
      <p
        className="cursor-pointer underline"
        onClick={() => setShowData((prev) => !prev)}>
        {showData ? "Hide" : "Show"} data
      </p>
    </div>
  );
};

export default Prediction;
