window.addEventListener("load",function(){
    console.log("cargo")
    let form = document.querySelector(".contacto");
    form.addEventListener("submit", function(e){
        let errores= [] //para crear un array de errores

        let nombre= document.querySelector("input.nombre")
        if (nombre.value=="" ){
            errores.push("Debes ingresar tu nombre"); //agrego el al array
        }

        let email= document.querySelector("input.email")
        if (email.value=="" ){
            errores.push("Debes ingresar un email");
        }
        
        let mensaje= document.querySelector("textarea.mensaje")
        if (mensaje.value=="" ){
            errores.push("El campo mensaje no puede estar vacio");
        }

        if(errores.length > 0 ){ // si el hay errores entonces evito enviar el formulario
            e.preventDefault();
        }              
        let ulErrores= document.querySelector("div .errores ul"); 

        let liErrores= document.querySelectorAll(".errores li"); //busco a las etiquetas </li>

        if(liErrores.length == 0 ) {   // si no existe </li> lo creamos
            for(let i=0; i< errores.length; i++){ 
             ulErrores.innerHTML+= "<li>"+errores[i]+"</li>"; // agregamos la lista de errores al html

            } 
        } else{ // si existe una lista de errores en el html lo borramos, así luego se actualiza los nuevos errores (si existe)
            liErrores.forEach(element => {
            element.remove()
        });
            for(let i=0; i< errores.length; i++){ //cuando vuelva a enviar el formulario se va a agregar la nueva listta de errores
            ulErrores.innerHTML+= "<li>"+errores[i]+"</li>"; 
            } ;
        };
    }); 
});