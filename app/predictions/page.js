"use client";

import { useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import { useSession } from "next-auth/react";
import Prediction from "../components/Prediction";

export default function Home() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [checkedNumber, setCheckedNumber] = useState(0);

  useEffect(() => {
    if (status !== "authenticated" || !session.user) return;
    (async function () {
      const res = await fetch(
        `api/predictions?user=${encodeURIComponent(session.user.id)}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData.message);
      } else {
        const data = await res.json();
        setCheckedNumber(data.checkedCount);
        setPredictions(data.predictions);
      }
      setIsLoading(false);
    })();
  }, [session, status]);

  return (
    <main className="flex w-screen justify-center pt-10">
      <div>
        <h1 className="text-2xl font-medium mb-2">My predictions</h1>
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <p className="text-lg mb-2">
              Number of checked entries inside db: {checkedNumber}
            </p>
            {predictions.map((pred) => (
              <Prediction pred={pred} key={pred._id} />
            ))}
          </>
        )}
        {!isLoading && predictions.length === 0 && (
          <p>You have no predictions</p>
        )}
      </div>
    </main>
  );
}
