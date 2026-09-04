import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@evstay.in" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@evstay.in";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin@evstay2026!";

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return {
            id: "admin-1",
            name: "EVStay Super Admin",
            email: adminEmail,
            role: "admin"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/a/admin000/login"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "admin";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.AUTH_SECRET || "evstay-secret-key-32-chars-minimum-hash-2026-secure"
});
