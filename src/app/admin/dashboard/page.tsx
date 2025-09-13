import DeleteUser from "@/components/delete-user";
import ReturnButton from "@/components/return-button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/auth/login");

  if (session.user.role !== "ADMIN") return <div>Forbidden</div>;

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="m-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">User Dashboard</h1>
      <ReturnButton href="/" label="Home" />

      <div className="overflow-x-auto  shadow-sm">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-800">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    defaultValue={user.role}
                    className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <DeleteUser user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
