import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Logout } from "@/components/Logout";
import { redirect } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export default async () => {
  const session = await getServerSession(authOptions);
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  if (!session?.user?.trainerId) redirect("/");

  const result = await convex.query(api.trainer.getTrainerById, {
    id: session?.user?.trainerId as Id<"trainer">,
  });

  if (!result?.phoneNumber || !result?.phoneNumber) {
    redirect("/setup");
  }

  return (
    <>
      <h1>Dashboard</h1>
      <Logout />
    </>
  );
};
