"use server";
import { FormValues } from "@/components/forms/SetupForm";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";


const updateUser = async (id: Id<"trainer">, values: FormValues) => {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
    const session = await getServerSession(authOptions);
    const trainerId = session?.user.trainerId as Id<"trainer">;
    try {
        await convex.mutation(api.trainer.setupTrainer, {id: trainerId, ...values})
        return true
    } catch (error) {
        console.error("Error updating user", error)
    }
}

export async function submitSetupTrainer(values: FormValues) {
    const session = await getServerSession(authOptions);
    const trainerId = session?.user.trainerId as Id<"trainer">;
    const result = await updateUser(trainerId, values)

    if(result) {
        redirect("/dashboard")
    }
}