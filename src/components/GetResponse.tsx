"use client"

import React, { useEffect } from "react";

export default function GetResponse({ id , type}: { id: string, type : string }) {
  const [data, setData] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/${type}`, {
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
        console.log(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-5 text-justify text-zinc-200 border-2 border-zinc-200 p-5">
      <h1>{data}</h1>
    </div>
  );
}