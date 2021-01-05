module.exports = (sequelize, dataTypes) =>{
    let alias = 'Usuario';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre: dataTypes.STRING,
        apellido: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        rol_id: dataTypes.INTEGER // PARA SABER SI ES ADMINISTRADOR O USUARIO
    }
    let config = {
        tableName : 'usuarios',
        timestamps : false
    }

    const Usuario = sequelize.define(alias,cols,config);

    Usuario.associate = function(models){

        Usuario.hasMany(models.Carrito, 
            {
            as: "carritos",
            foreignKey: "usuario_id"
            }
        );
    
    Usuario.belongsTo(models.Rol, 
        {
        as: "roles",
        foreignKey: "rol_id"
         }
    );
}
    return Usuario;
}