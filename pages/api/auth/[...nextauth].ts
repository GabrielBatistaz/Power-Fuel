// "use client";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/bibliotecas/prismadb";
import CredentialsProviders from "next-auth/providers/credentials";

export const OpcoesAutenticacao: AuthOptions = {
    
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        
        CredentialsProviders({
            
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Email ou senha inválidos");
                }
                

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error("Email ou senha inválidos");
                }
                const bcrypt = require("bcrypt");
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword) {
                    throw new Error("Email ou senha inválidos");
                }
                return user;
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(OpcoesAutenticacao);