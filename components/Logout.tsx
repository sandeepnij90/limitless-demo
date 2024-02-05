"use client";
import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <button onClick={() => signOut()} className="primary-button">
      Logout
    </button>
  );
};
