var db = require('../db');

module.exports = function(app){

  app.get('/products', function(req, res){
    db.productModel.find(function(err, products){
      if(err) throw err;

      res.render('products', {products: products});
    });

  });

}
