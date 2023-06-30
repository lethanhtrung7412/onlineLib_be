import jwt from "jsonwebtoken";
import passport from "passport";
import GoogleStrategy, {Profile} from "passport-google-oauth-token";
import userHandler from "../handlers/user.handler";
import { TypeAuth, User } from "../../database/entities/User";

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }, async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
    ) => {
        try {
            const userExits = await userHandler.getAccountGoogle(
                TypeAuth.GOOGLE,
                profile.id
            )

            if (userExits) {
                const newToken = jwt.sign(
                    {id: profile.id},
                    process.env.JWT_SECRET
                );

                return done(null, {...userExits, token: newToken})
            }

            const newUser = await userHandler.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId:profile.id,
                typeAuth: TypeAuth.GOOGLE
            } as User);

            
        } catch (error) {
            done({ message: "Sign in by google failed" }, null);
        }
    })
)
