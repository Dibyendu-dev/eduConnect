import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";
import { Content } from "next/font/google";

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });
     const response = await fetch(url, {
       handlers: {
        ContentType: "application/x-www-form-urlencoded", 
       },
         method: "POST",
      })

      const refreshedTokens = await response.json();

      if (!response.ok) {
        throw refreshedTokens;
      }

      return {
        ...token,
        accessToken: refreshedTokens?.access_token,
        accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
        refreshToken: refreshedTokens?.refresh_token,
      }
    }catch(err) {
      console.error(err);

      return {
        ...token,
        error: "RefreshAccessTokenError",
      }
    }
}

export const {  
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          const user = await User.findOne({ email: credentials?.email });
          console.log(user);

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return user;
            } else {
              console.error("password mismatch");
              throw new Error("Check your password");
            }
          } else {
            console.error("User not found");
            throw new Error("User not found");
          }
        } catch (err) {
          console.error(err);
          throw new Error(err);
        }
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
    async jwt({ token, user, account }) {
      if(account && user) {
        return {
        
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user
        }
      }

      if(Date.now() < token.accessTokenExpires) {
        return token
      }

      return await refreshAccessToken(token)
    },
    async session({token, session}){ {
      session.user=token?.user,
      session.accessToken=token?.accessToken,
      session.error=token?.error
      return session
    }
    }
  }
});
