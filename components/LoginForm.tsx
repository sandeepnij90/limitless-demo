"use client";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  return (
    <button
      onClick={() => {
        signIn("google");
      }}
    >
      Login
    </button>
  );
};
