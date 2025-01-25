"use client";

import React, { useEffect } from "react";
import Card from "./Card";

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
        <Card text={data} isLoading={loading} type={type} />
    </div>
  );
}
