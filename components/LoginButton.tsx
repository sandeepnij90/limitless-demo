"use client";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
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
