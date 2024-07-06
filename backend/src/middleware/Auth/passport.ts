import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const SECRET =
  process.env.JWT_SECRET || "rMk,E(6SvKw;5q=[CTf!pN+?hY<d@$.Ha47B%8zg";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const displayName = profile.displayName;
        const photo = profile.photos?.[0].value;
        const googleId = profile.id;

        if (!email) {
          return done(new Error("No email found in Google profile"), false);
        }

        // Checks in db if user exists
        let user = await prisma.user.findUnique({ where: { email } });

        //
        if (!user) {
          let username = displayName;
          const existingUserName = await prisma.user.findUnique({
            where: { name: username },
          });
          if (existingUserName) {
            username = `${username}-${crypto.randomBytes(4).toString("hex")}`;
          }

          // Create id for user. It is not done via uuid cause its too long
          let id;
          let sameId;

          do {
            id = crypto.randomBytes(5).toString("hex");
            sameId = await prisma.user.findUnique({ where: { id } });
          } while (sameId);

          // Create user in postgres
          user = await prisma.user.create({
            data: {
              id,
              email,
              name: username,
              role: "USER",
              isVerified: true,
              avatarUrl: photo,
              googleId: googleId,
              provider: "OAUTH",
            },
          });

          // Generate JWT token
          const token = jwt.sign({ userId: user.id, role: user.role }, SECRET);

          // Attach token to user object
          return done(null, { ...user, token });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
