# log_in_boilerplate
boilerplate for login. Allows passport to do the heavy lifting.

CORE LIBRARY:
- passportjs
- express 4
- ejs template engine

CORE CONCEPTS:
- authentication, link diff authentication together.
- EXPOSES express req.user because of passport.
- configure Facebook Developer Portal.
- set up local environment to accomodate the concept(eg. save to database, set up correct routes that mimic an actual application.
- EJS: make sure variables in view are sent from routes; otherwise view will not render.

ALERT:
- express
- take note of the route middleware used.
- understand what Facebook API returns, then modify your USER MODEL ACCORDINGLY. Otherwise, would generate errors
- suggestion: use nodemon. IDENTIFIES bug immediately when SAVING the project.
- only YOUR facebook account can be used for log in, due to the test environment.
