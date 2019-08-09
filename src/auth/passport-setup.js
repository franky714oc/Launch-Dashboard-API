const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");
const crypto = require("crypto");





function getId(id){
    return crypto.createHash("sha256").update(id).digest("hex");
}


function addUserToDb(profile, done){
    User.create({
        username: profile.displayName,
        googleId: getId(profile.id)
    }).then((result) => {
        console.log(`New user created: ${result.username}`);
        done(null, result);
    });
}




passport.use(
    new GoogleStrategy({
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        const userId = getId(profile.id);

        // Check if user already exists in the database
        User.findOne({googleId: userId}).
            then((result) => {
                if (result){
                    done(null, result, null);
                }else{
                    done(null, null, null);
                }
            });

    })
);
