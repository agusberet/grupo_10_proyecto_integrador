window.addEventListener("load",function(){
    console.log("Se cargó la pagina");
    let form= document.querySelector("form"); //buscamos al formulario
    let reset= document.querySelector(".reset");

    form.addEventListener("submit", function(e){ //funciona cuando se envia el formulario        
        let confirma= confirm("¿Confirma que desea ACTUALIZAR los datos del producto?")
        if (!confirma){
            e.preventDefault();
        }                
    }); 
    reset.addEventListener("click", function(e){ //cuando hacen click en el boton reset
        let confirma= confirm("¿confirma que desea RESETEAR? el producto tendrá valores predeterminados (los datos no se actualizaran)")
        if (!confirma){
            e.preventDefault();
        }       
    })

});