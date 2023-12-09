"use client";

import { useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import { useSession } from "next-auth/react";
import Prediction from "../components/Prediction";

export default function Home() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

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
        setPredictions(data);
      }
      setIsLoading(false);
    })();
  }, [session, status]);

  return (
    <main className="flex flex-col px-24 justify-center pt-10">
      {isLoading && <Spinner />}
      {!isLoading &&
        predictions.map((pred) => <Prediction pred={pred} key={pred._id} />)}
    </main>
  );
}
