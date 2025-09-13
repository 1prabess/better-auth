"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "@/types/user";

const StartButton = () => {
  const { data, isPending } = useSession();
  const session = data?.session;
  const user = data?.user as User | undefined;

  const href = session ? "/profile" : "/auth/login";

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {user && (
        <p className="my-3 text-2xl ">
          Welcome back, {user.name} {user.role}!
        </p>
      )}
      <Button asChild className="px-4 py-5 rounded-none text-white ">
        <Link href={href}>Get Started</Link>
      </Button>
    </div>
  );
};

export default StartButton;
