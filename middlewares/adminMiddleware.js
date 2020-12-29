

let adminMiddleware = function (req,res,next){
      if(req.session.usuarioLogueado.email == 'fashionize@gmail.com'){
          res.locals.isAdmin = true;
        
          res.locals.adminLogueado = req.session.usuarioLogueado 
          next();
      } else {
          if (req.session.usuarioLogueado.email != 'fashionize@gmail.com'){
                res.locals.isAdmin = false
                res.send('Error, No sos administrador!');
          }         
      }
        
}

module.exports = adminMiddleware;
