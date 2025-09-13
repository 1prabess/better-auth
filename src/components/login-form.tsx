"use client";

import { Label } from "@radix-ui/react-label";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import ReturnButton from "./return-button";
import { useRouter } from "next/navigation";
import OauthButton from "./oauth-button";

const LoginForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = String(formData.get("email"));
    if (!email) return toast.error("Please enter your email!");

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your password!");

    await signIn.email(
      { email, password },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Login successfull!");
          router.push("/profile");
        },
      }
    );
  };

  return (
    <section className="flex min-h-screen  px-4 py-16 md:py-32">
      <ReturnButton href="/" label="home" />
      <form
        onSubmit={handleSubmit}
        className="bg-white m-auto w-full max-w-md border border-gray-200 p-8"
      >
        <div className="mb-6 ">
          <h1 className="text-4xl font-semibold text-gray-900">
            Login to your account
          </h1>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-800"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-none transition"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-800"
              >
                Password
              </Label>

              <Link href="/auth/forgot-password">
                <p className="text-sm">Forgot password?</p>
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-none transition"
            />
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-none transition"
          >
            Login
          </Button>
        </div>

        <div className="mt-4 flex  justify-between">
          <OauthButton provider="google" />
          <OauthButton provider="github" />
        </div>

        <div className="mt-6 text-center border-t border-gray-300 pt-4 text-sm text-gray-700">
          Dont have an account?{" "}
          <Button
            asChild
            variant="link"
            className="px-1 text-gray-900 hover:text-gray-700 underline"
          >
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
