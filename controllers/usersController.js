
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../src/database/models');
const { stringify } = require('querystring');

const usersController = {  
    locals: function (req, res, next) {
        res.render("prueba"); 
    }, 
    
    register: function (req, res, next) {
        res.render("register"); //lo enviamos a la vista register
    },

    createUser: function (req, res, next) {
        // verifica que no haya errores
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("register", { errors: errors.errors })
        }
        //busco al email del usuario, si no existe creamos el usuario
      db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(!usuario){
                db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    rol_id: 1 
                                     
                })
               .then(function(usuario){
                    req.session.usuarioLogueado= usuario.email;
                    res.cookie('usuarioID', usuario.id, {maxAge:80000000}); 
                    res.cookie('usuarioRol',  usuario.rol_id, {maxAge:80000000});                

                    res.redirect('/products');                    
                })
            } else {
               res.render("register",{errorAlLoguear:"El email ingresado ya existe."});
          }
       })
    },

    
    login:(req,res)=>{
        if(req.session.usuarioLogueado != undefined){
            res.render('login',{usuario:usuarioLogueado})
        }else{
            res.render('login')
        }
        
    },

    processLogin: function (req, res, next) {  
        // verifica que no haya errores
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("login", { errors: errors.errors })
        }

        //buscamos al usuario
        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(!usuario){ //si no encontramos al usuario:
                res.render("login",{errorAlLoguear:"Usuario y/o contraseña invalida."});  
            } else {
                if(bcrypt.compareSync(req.body.password, usuario.password)){ // comparamos la contraseña ingresada con la contraseña de la db
                    
                    req.session.usuarioLogueado = usuario; 
                    res.locals.isAuthenticated = true;
                    res.locals.usuarioLogueado = usuario.email;    
                    

                    if(req.body.remember!= undefined){
                        res.cookie('remember', usuario.email, {maxAge:80000000}); 
                        res.cookie('usuarioID', usuario.id, {maxAge:80000000}); 
                        res.cookie('usuarioRol',  usuario.rol_id, {maxAge:80000000});                         
                    }
                    res.redirect('/home');
                } else {
                    res.render("login",{errorAlLoguear:"Usuario y/o contraseña invalida."});
                }
            }
            
        })
    },

    micuenta : function (req, res, next) {
        if(req.cookies.remember!= undefined){ 
            let usuario= req.cookies.remember;
            db.Usuario.findOne({
                where: {
                    email: usuario
                }
            })
            .then(function(usuario){
                req.session.usuarioLogueado= usuario.email;       
                res.render('miCuenta', {usuario}) 
            })
    }else{
        res.render('login');

    }
},



    editPerfil: function(req,res){
        db.Usuario.findByPk(req.params.id)
        .then(function(usuario){
            res.render('editPerfil', {usuario})
        })
    },


    newPerfil: function(req,res){
        db.Usuario.findByPk(req.params.id)
        .then(function (usuario) {
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.render("users/editPerfil/"+req.params.id, {errors:errors.errors, usuario})
            } else {
                db.Usuario.update({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                   // direccion: req.body.direccion,
                   // provincia: req.body.provincias,
                  
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                    .then(function () {
                        res.render('micuenta', {usuario});
                    })
            }
        })
},

    editPassword: function(req,res,next){
        db.Usuario.findByPk(req.params.id)
        .then(function(usuario){
            res.render('editPassword', {usuario})
        })
    },

    updatePassword: function(req,res,next){
        db.Usuario.findByPk(req.params.id)

        .then(function(usuario){        
                if(bcrypt.compareSync(req.body.password, usuario.password)){

                    db.Usuario.update({
                        password: bcrypt.hashSync(req.body.newPass)
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(function(){
                        res.render('micuenta', {usuario});
                    })
                } else {
                    res.render("editPassword",{errorAlLoguear:"contraseña invalida.", usuario});      
                }
            
        })
        
    },

    agregarAdmin: function (req, res, next) {
        res.render("agregarAdmin");
    },

    processAdmin: function (req, res, next) {
        // verifica que no haya errores
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("agregarAdmin", { errors: errors.errors })
        }
        //busco al email del usuario, si no existe creamos el usuario
      db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(!usuario){
                db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    rol_id: 2 
                                     
                })
               .then(function(usuario){
                         

                    res.redirect('/products');                    
                })
            } else {
               res.render("AgregarAdmin",{errorAlLoguear:"El email ingresado ya existe."});
          }
       })
    },








    destroySession: function (req, res, next){
        req.session.destroy(
            function (){
                res.clearCookie('remember')                
                res.redirect("/users/login")
            }
        )
        
    }
}

module.exports = usersController;