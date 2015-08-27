var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var fbConfig = require('./fb.js');


module.exports = function(passport) {
    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl,
        passReqToCallback:true
    },

    // facebook will send back the tokens and profile
    function(req, access_token, refresh_token, profile, done) {
    	console.log('profile', profile);
		// asynchronous
		process.nextTick(function() {
			
	        if(!req.user){//check if user exists
	        	// find the user in the database based on their facebook id
	        User.findOne({ 'fb.id' : profile.id }, function(err, user) {
	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            console.log('finding profile ID !$%^#$@!');
	            if (err)
	                return done(err);
				// if the user is found, then log them in
	            if (user) {
	            	console.log('already exists!@^#%@%$!%@^&*()');
	                return done(null, user); // user found, return that user
	            } else {
	                console.log('CREATing new user!@^#%@%$!%@^&*()');
	                // if there is no user found with that facebook id, create them
	                var newUser = new User();
					// set all of the facebook information in our user model
	                newUser.fb.id = profile.id; // set the users facebook id	                
	                newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user	                
	                newUser.fb.displayName = profile.displayName;
	                //newUser.fb.firstName  = profile.name.givenName;
	                //newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	                //newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
					// save our user to the database
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;
	                    // if successful, return the new user
	                    return done(null, newUser);
	                });
	            }
	        });

			}
			else{
				//user already exists and is logged in.
				var user=req.user;

				user.fb.id=profile.id;
				user.fb.access_token=access_token;
				user.fb.displayName=profile.displayName;
				user.save(function(err){
					if (err) throw err;
					return done(null,user);
				})
			}

        }
        );
    }));
};
