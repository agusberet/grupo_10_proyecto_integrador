let authMiddleware = function (req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        res.locals.isAuthenticated = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        next();
    } else {
        res.locals.isAuthenticated = false;
        res.redirect("/users/login")
        
    }
}

module.exports = authMiddleware