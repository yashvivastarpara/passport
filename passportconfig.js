const localStrategy = require("passport-Local").Strategy;

const { User } = require("./db");

exports.initializingPassport = (passport) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
        try{
             const user = await User.findOne({ username });
             if (!user) return done(null, false);
             if (user.password !== password) return done(null, false);
             return done(null, user);
            }
            catch(error)
            {
                return done (error, false);
            }
    })
  );

  passport.serializeUser((user,done)=>{
    done(null, user.id);
  });
   
  passport.deserializeUser(async(user,done)=>{
    try{
        const user = await user.findById(id);

        done(null, user);
    }
    catch(error){
        done(error, false);
    }
  })
};
