// src/lib/auth.ts
import type { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import type { Adapter } from 'next-auth/adapters'
import { MongoClient } from 'mongodb'
import { sendVerificationRequest } from '@/lib/email/resend'
import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

const client = new MongoClient(process.env.MONGODB_URI!)
const clientPromise = client.connect()

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        EmailProvider({
            from: process.env.EMAIL_FROM,
            sendVerificationRequest,
        }),
    ],
    pages: {
        signIn: '/auth',
        verifyRequest: '/auth/verify-request',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt' as const,
    },
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.sub as string
                session.user.email = token.email as string
                session.user.name = token.name as string
                session.user.image = token.image as string
            }
            return session
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`
            if (new URL(url).origin === baseUrl) return url
            return `${baseUrl}/`
        },
    },
}