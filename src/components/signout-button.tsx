"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

const SignOutButton = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          toast.success("Logout successfull!");
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      type="button"
      variant="destructive"
      className="rounded-none"
      onClick={handleClick}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
