import React, { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface OauthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

const OauthButton = ({ provider, signUp }: OauthButtonProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const action = signUp ? "Up" : "In";
  const providerName = provider === "google" ? "Google" : "GitHub";
  const ProviderIcon = providerName === "Google" ? FaGoogle : FaGithub;

  const handleClick = async () => {
    await signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/login/error",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <Button
      className="rounded-none px-6 bg-transparent border-black border hover:bg-transparent cursor-pointer text-black"
      onClick={handleClick}
      disabled={isPending}
    >
      <ProviderIcon />
      Sign {action} with {providerName}
    </Button>
  );
};

export default OauthButton;
