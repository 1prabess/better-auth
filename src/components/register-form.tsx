"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import ReturnButton from "./return-button";
import { useRouter } from "next/navigation";
import OauthButton from "./oauth-button";

const RegisterForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const name = String(formData.get("name"));
    if (!name) return toast.error("Please enter your name!");

    const email = String(formData.get("email"));
    if (!email) return toast.error("Please enter your email!");

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your password!");

    await signUp.email(
      { name, email, password },
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
          toast.success("Account has been registered!");
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
            Create an account
          </h1>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-800">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-none transition"
            />
          </div>

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
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-800"
            >
              Password
            </Label>
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
            Register
          </Button>
        </div>

        <div className="mt-4 flex  justify-between">
          <OauthButton provider="google" signUp />
          <OauthButton provider="github" signUp />
        </div>

        <div className="mt-6 text-center border-t border-gray-300 pt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <Button
            asChild
            variant="link"
            className="px-1 text-gray-900 hover:text-gray-700 underline"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
