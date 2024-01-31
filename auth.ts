import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useMutation, useQuery} from 'convex/react'
import { api } from "./convex/_generated/api";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { ConvexHttpClient } from "convex/browser"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({token, profile}) {
      const trainerID = "TESTING_TRAINER_ID" // change
      token.trainerId = trainerID
      return token
    },
    async session({session, token}) {
      session.user.trainerId = token.trainerId as string
      return session
    },
    async signIn({ profile }) {
      await convex.action(api.trainer.signUpTrainer, {email: profile?.email as string, name: profile?.name as string})
      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};