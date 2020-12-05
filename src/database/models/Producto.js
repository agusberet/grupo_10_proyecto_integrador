module.exports = (sequelize, dataTypes) => {

    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        categoria_id: dataTypes.INTEGER,
        marca: dataTypes.STRING,    
        precio: dataTypes.FLOAT,
        descuento: dataTypes.INTEGER,
        subcategoria_id: dataTypes.INTEGER,
        descripcion: dataTypes.STRING,    
        stock:dataTypes.INTEGER,   
       
    }
    let config = {
        tableName: "productos",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {    
        Producto.belongsTo( //pertenece a una categoría
            models.Categoria,
            {
                as: 'categorias',
                foreignKey: 'categoria_id' 
            }
        ), 
        Producto.belongsTo(
            models.Subcategoria,
            {
                as: 'subcategorias',
                foreignKey: 'subcategoria_id' 
            }
        ),
        Producto.hasMany(
            models.Color, 
            { //un producto tiene muchos colores
            as: "color",
            foreignKey: "color_id"
             }
        ),
        Producto.hasMany(models.Talle,
             {
            as: "talle",
            foreignKey: "talle_id"
            }
        ),
           
        Producto.hasMany( //tiene muchas imagenes asociadas
             models.ImagenesProducto,
                {
                    as: 'imagenesProducto',
                    foreignKey: 'producto_id', 
                    timestamps: false
                }
        ),
        Producto.belongsToMany(
            models.Carrito, // se relaciona con "carrito" a traves de la tabla intermedia
            {
                as : 'carrito', //nombre de la relacion 
                through: 'carrito_producto', //TABLA INTERMEDIA
                foreignKey: 'carrito_id',
                otherKey: 'producto_id',
            }
        )
        Producto.hasMany(models.Carrito_Producto, 
            {
            as: "carrito_producto",
            foreignKey: "producto_id"
            }
        );
        
    }
    return Producto;
}