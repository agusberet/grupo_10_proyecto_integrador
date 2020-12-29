const db = require('../src/database/models');

function rememberMiddleware(req, res, next){
 
    if(req.cookies.remember != undefined && req.session.usuarioLogueado == undefined){
        db.Usuario.findOne({
            where: {
                email: req.cookies.remember
            }
        })
        .then(function(usuario){
            if(req.cookies.remember == usuario.email){
                
                req.session.usuarioLogueado = usuario;
                res.locals.isAuthenticated = true;
                res.locals.usuarioLogueado = usuario
            } 
            
        })
      
    }
    next();
}

module.exports = rememberMiddleware;