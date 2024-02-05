"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

export const LoginButton = () => {
  const { data } = useSession();

  useLayoutEffect(() => {
    if (data) {
      redirect("/dashboard");
    }
  }, [data]);

  return (
    <div className="flex gap-6">
      <button
        className="primary-button"
        onClick={() => {
          signIn("google");
        }}
      >
        Login
      </button>
    </div>
  );
};
