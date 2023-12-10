"use client";
import { useState } from "react";
import Chart from "./ui/Chart";

const Prediction = ({ pred }) => {
  const [showData, setShowData] = useState(false);
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [isChecked, setIsChecked] = useState(pred.isChecked);
  const [isPredictionAccepted, setIsPredictionAccepted] = useState(
    pred.setIsPredictionAccepted
  );
  const [doctorReview, setDoctorReview] = useState(pred.doctorPrediction || "");

  const onReview = async (isPredictionAccepted, doctorPrediction) => {
    const res = await fetch(`api/predictions?id=${pred._id.toString()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isPredictionAccepted, doctorPrediction }),
    });
    if (res.ok) {
      alert("Prediction updated");
      setIsChecked(true);
      setIsPredictionAccepted(isPredictionAccepted);
      setDoctorReview(doctorPrediction);
      setShowData(false);
      setShowDeclineForm(false);
    } else {
      const errorData = await res.json();
      console.log(errorData.message);
    }
  };

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
      {isChecked && !isPredictionAccepted && (
        <p>Doctor prediction: {doctorReview}</p>
      )}
      <p>Model Prediction: {pred.prediction}</p>
      <p>Status: {isChecked ? "Checked" : "Not checked"}</p>
      {showData && (
        <>
          <Chart data={pred.data} />
          {!pred.isChecked && (
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-green-700 px-6 py-2 mt-3 text-white"
                onClick={() => onReview(true)}>
                Accept
              </button>
              <button
                type="button"
                className="bg-red-700 px-6 py-2 mt-3 text-white"
                onClick={() => setShowDeclineForm(true)}>
                Decline
              </button>
            </div>
          )}
          {showDeclineForm && (
            <form
              className="mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                onReview(false, doctorReview);
              }}>
              <label>Enter your review:</label>
              <input
                type="text"
                className="block border py-2 px-4 mt-2"
                required
                value={doctorReview}
                onChange={(e) => setDoctorReview(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black px-6 py-2 mt-3 text-white">
                Submit
              </button>
            </form>
          )}
        </>
      )}
      <p
        className="cursor-pointer underline mt-3"
        onClick={() => {
          setShowData((prev) => !prev);
          setShowDeclineForm(false);
        }}>
        {showData ? "Hide" : "Show"} more
      </p>
    </div>
  );
};

export default Prediction;
