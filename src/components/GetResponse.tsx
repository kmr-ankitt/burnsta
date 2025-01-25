"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function GetResponse({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const [data, setData] = useState("");
  const [pfp, setPfp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const responseData = await response.json();
        setData(responseData[type]);
        setPfp(responseData.userpfp);
      } catch (error : any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  return (
    <div className="h-[85vh] w-full flex items-center justify-center">
      <Card
        text={data}
        loading={loading}
        error={error}
        type={type}
        pfp={pfp}
        setLoading={setLoading}
      />
    </div>
  );
}
