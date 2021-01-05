

let adminMiddleware = function (req,res,next){
      if(req.session.usuarioLogueado.email == 'fashionize@gmail.com' || req.session.usuarioLogueado.email == 'julianscarramberg@gmail.com'){
          res.locals.isAdmin = true;
        
          res.locals.adminLogueado = req.session.usuarioLogueado 
      if(req.session.usuarioLogueado.rol_id == 2){
          next();
      } else {
          if (req.session.usuarioLogueado.rol_id != 2){
                res.send('Error, No sos administrador!');
          }         
      }
        
}

module.exports = adminMiddleware;
