"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StartButton from "@/components/start-button";

const Home = () => {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check for error query parameter
  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "invalid_token") {
      setErrorMessage("The token is invalid or expired.");
    }
  }, [searchParams]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b px-4 py-16 md:py-32">
      <div className="text-center max-w-xl">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <StartButton />
        </div>
      </div>
    </section>
  );
};

export default Home;
