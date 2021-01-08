

let adminMiddleware = function (req,res,next){
      
      if(req.cookies.usuarioRol == 2){
          next();
      } else {
          if (req.cookies.usuarioRol != 2){
                res.send('Error, No sos administrador!');
          }         
      }
      }
    
        


module.exports = adminMiddleware;
