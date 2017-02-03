
// ### Modulo dedicado a validação de Login ###

// Carrega Passport para autenticação no Facebook
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID       =   '1825483904332763',
    FACEBOOK_APP_SECRET   =   '665ab0405d2ddb924c231726b8b16a5c';

module.exports = function(app){

  passport.use(new FacebookStrategy({

    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3001/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'link', 'photos', 'email']

  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      // console.log(profile);
      done(null, profile);
    });

  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    // console.log('serializeUser:');
    // console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // console.log('deserializeUser:');
    // console.log(user);
    done(null, user);
  });

  // Submete o usuario para autenticação no Facebook
  app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ['email', 'public_profile']})
  );

  // Esta rota é dedicado ao request que o Facebook ira enviar para o servidor
  // com o resultado da autenticação

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/'
  }), function(req, res){
    // Renderiza a View enviado o usuario recuperado pela autenticacao no Facebook
    res.redirect('/home');
    
  });

  app.get('/', function(req, res){
      res.render('index');
  });

  app.get('/login', function(req, res){
    res.render('login');
  });

}
