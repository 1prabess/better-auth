"use client";

import { deleteUser } from "@/actions/delete-user-action";
import { User } from "@/types/user";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteUserProps {
  user: User;
}

const DeleteUser = ({ user }: DeleteUserProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsPending(true);
    const { error } = await deleteUser(user.id);

    if (error) {
      toast.error(error);
    }
    setIsPending(false);
  };
  return (
    <div>
      {user.role === "USER" && (
        <>
          <button className="rounded bg-gray-800 px-3 py-1 text-xs font-medium text-white hover:bg-gray-700">
            Save
          </button>
          <button
            onClick={handleDelete}
            className="rounded border border-red-500 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteUser;
