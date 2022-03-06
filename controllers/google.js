const User = require('../models/User');
const passport = require('passport');
const config = require('./../config/Config');
const Strategy = require('passport-google-oauth20').OAuth2Strategy;
module.exports.controller = (app) => {
 // google strategy
 passport.use(new Strategy({
 clientID: config.GOOGLE_APP_ID,
 clientSecret: config.GOOGLE_APP_SECRET,
 callbackURL: '/login/google/return',
 },
 (accessToken, refreshToken, profile, cb) => {
 // Handle google login
 }));
 app.get('/login/google',
 passport.authenticate('google', { scope: ['email'] }));
 app.get('/login/google/return',
 passport.authenticate('google', { failureRedirect: '/login' }),
 (req, res) => {
 res.redirect('/');
 });

};
