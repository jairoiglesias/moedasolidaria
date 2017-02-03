var db = require('../db');

module.exports = function(app){

  app.get('/login_auth_success', function(req, res){

    //console.log('Carregando Home ...');
    //console.log(req.session.passport);
    //req.session.logged = true;

    db.userTaskModel.find({user_email: req.session.passport.user.emails[0].value}, function(err, user_tasks){
      if(err) throw err;

      res.render('home', {user: req.session.passport.user, user_tasks: user_tasks});
    });

  });


}
