import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/service/mongo";

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    ...authConfig,
    trustHost: true,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials == null) return null;

                await dbConnect();
                const user = await User.findOne({
                    email: credentials.email?.toLowerCase(),
                });

                if (!user) throw new Error("User not found");
                if (!user.password) {
                    throw new Error("Please sign in with Google");
                }

                const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isMatch) throw new Error("Check your password");

                return {
                    id: user._id.toString(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    profilePicture: user.profilePicture,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,

        async signIn({ user, account, profile }) {
            if (account?.provider !== "google") return true;
            if (!profile?.email_verified) return false;

            await dbConnect();
            const email = user.email.toLowerCase();
            const existing = await User.findOne({ email });

            // আগে থেকে থাকলে (যেমন instructor) কিছুই বদলাবে না
            if (!existing) {
                await User.create({
                    firstName: profile.given_name || user.name || "User",
                    lastName: profile.family_name || "",
                    email,
                    role: "student",
                    profilePicture: user.image || "",
                });
            }
            return true;
        },

        async jwt({ token, user }) {
            // শুধু লগইনের মুহূর্তে ডাটাবেস থেকে আসল তথ্য আনা হয়
            if (user) {
                await dbConnect();
                const dbUser = await User.findOne({
                    email: user.email.toLowerCase(),
                })
                    .select("-password")
                    .lean();

                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role;
                    token.firstName = dbUser.firstName;
                    token.lastName = dbUser.lastName;
                    token.profilePicture = dbUser.profilePicture;
                }
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.profilePicture = token.profilePicture;
            return session;
        },
    },
});