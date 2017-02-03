var db = require('../db');

module.exports = function(app){

  app.get('/tasks', function(req, res){
    console.log(db);
    db.taskModel.find(function(err, tasks){
      if(err) throw err;

      res.render('tasks', {tasks: tasks});
    });

  });

}
