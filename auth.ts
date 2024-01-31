import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    }

  },
  secret: process.env.NEXTAUTH_SECRET,
};