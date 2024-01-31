"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const LoginForm = () => {
  const { data } = useSession();

  console.log({ data });
  return (
    <div className="flex gap-6">
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Login
      </button>

      <button
        onClick={() => {
          signOut();
        }}
      >
        logout
      </button>
    </div>
  );
};
