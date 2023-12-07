"use client";

import { useState } from "react";
import ChartComponent from "./components/ui/Chart";
import Spinner from "./components/ui/Spinner";

export default function Home() {
  const [val, setVal] = useState("");
  const [pred, setPred] = useState();
  const [anomalyType, setAnomalyType] = useState("");
  const [loading, setLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(true);

  const submitHandler = () => {
    setIsChanging(false);
    setLoading(true);
    fetch(`http://localhost:3000/api/isAnomaly?data=${encodeURIComponent(val)}`)
      .then((res) => res.json())
      .then(async (data) => {
        setPred(data.isNormal);
        if (!data.isNormal) {
          const res = await fetch(
            `http://localhost:3000/api/typeAnomaly?data=${encodeURIComponent(
              val
            )}`
          );
          data = await res.json();
          setAnomalyType(data.type);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="min-h-screen flex justify-center pt-20">
      <div className="w-[600px] bg-white h-fit py-14 px-16 rounded-2xl">
        <h1 className="text-3xl font-bold">ECG anomaly detection</h1>
        <p className="mt-3">Enter your data (as an array)</p>
        <input
          type="text"
          className="w-full text-black px-1 border border-black"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setIsChanging(true);
          }}
        />
        <button
          className="bg-black px-3 py-1 mt-1 text-white"
          onClick={submitHandler}>
          Submit
        </button>
        {loading && (
          <div className="flex justify-center mt-3">
            <Spinner />
          </div>
        )}
        {!loading && !isChanging && pred !== undefined && pred !== null && (
          <div className="mt-5">
            <ChartComponent data={JSON.parse(val)} />
            <h2 className="mt-3 font-bold">Your prediction:</h2>
            <p>{pred === 0 ? "Anomaly detected" : "No anomaly detected"}</p>
            {pred === 0 && <p>Anomaly type: {anomalyType}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
