let authMiddleware = function (req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        res.locals.usuarioID= req.cookies.usuarioID;
        res.locals.usuarioRol= req.cookies.usuarioRol;
        res.locals.usuarioNombre = req.cookies.usuarionNombre;
    

        next();
        
    }else{
        res.redirect("/users/login")
    }
}

module.exports = authMiddleware