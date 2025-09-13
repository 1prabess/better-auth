import { defaultStatements } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";

const statements = {
  ...defaultStatements,
  posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  USER: ac.newRole({
    posts: ["create", "read", "update:own"],
  }),
};
