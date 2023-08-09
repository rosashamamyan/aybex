const db = require("../models/index");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize()) 
app.use(passport.session()) 

authUser = (user, password, done) => {
   const authenticated_user = db.models.User.findOne({
     where: {
       email: user.email
     },
   });

   if(authenticated_user == undefined){
     done (null, false)
     return { errorMessage: "User not found" };
   }

   const userPassword = db.models.User.findOne({
    where: {
        password
    }
   })

   if(userPassword == undefined){
        done(null, false);
        return { errorMessage: "Invalid password" };
   }

   return done(null, authenticated_user);
}

passport.use(new LocalStrategy (authUser))