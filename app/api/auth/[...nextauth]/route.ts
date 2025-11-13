import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
            include: {
              citizen: {
                select: {
                  id: true,
                  personalInfo: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
              employee: {
                select: {
                  id: true,
                  personalInfo: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
            },
          });

          if (!user) {
            throw new Error("Credenciais inválidas");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.citizen?.personalInfo.firstName
              ? user.citizen.personalInfo.firstName +
                " " +
                user.citizen.personalInfo.lastName
              : user.employee?.personalInfo.firstName
              ? user.employee.personalInfo.firstName +
                " " +
                user.employee.personalInfo.lastName
              : "Usuário",
            type: user.type,
          };
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.type = user.type;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.type = token.type as string;
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
