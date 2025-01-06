"use client";

import React, { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

export default function GetResponse({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      {loading && <Skeleton className="w-[83.33%] h-3/6 rounded-lg" />}
      {!loading && (
      <div className="flex items-center justify-center text-justify w-10/12 h-3/6 p-5 text-zinc-200 bg-black/20 rounded-lg">
        <h1>{data}</h1>
      </div>
      )}
    </div>
  );
}
