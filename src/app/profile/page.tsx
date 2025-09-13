import ReturnButton from "@/components/return-button";
import SignOutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/auth/login");

  return (
    <div className="m-auto max-w-7xl px-4 py-16">
      <ReturnButton href="/" label="home" />
      {session.user.role === "ADMIN" && (
        <div className="my-4">
          <Button>
            <Link href="/admin/dashboard">Dashboard</Link>
          </Button>
        </div>
      )}
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Profile</h1>

      <SignOutButton />

      <p className="font-mono text-sm mt-4 text-gray-800 whitespace-pre-wrap break-words">
        {JSON.stringify(session, null, 2)}
      </p>
    </div>
  );
};

export default Profile;
