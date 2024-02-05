"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export const Logout = () => {
  const handleLogout = () => {
    signOut();
    redirect("/");
  };
  return (
    <button onClick={handleLogout} className="primary-button">
      Logout
    </button>
  );
};
