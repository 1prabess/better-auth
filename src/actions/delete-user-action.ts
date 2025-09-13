"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const deleteUser = async (userId: string) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) throw new Error("Unauthorized!");

  if (session.user.role !== "ADMIN" || session.user.id === userId)
    throw new Error("Forbidden!");

  try {
    await prisma.user.delete({
      where: {
        id: userId,
        role: "USER",
      },
    });

    return { error: null };
  } catch (error) {
    return { error: "Internal server error!" };
  }
};
