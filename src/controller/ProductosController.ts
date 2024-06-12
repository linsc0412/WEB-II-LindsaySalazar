import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entity/Productos";

class ProductosController{

    // cuando hago un llamado a un servidor y ahi dentro vendra la informacion
    static getAll= async(req: Request, resp: Response)=>{

        try {
            //instancia bd
            const repo= AppDataSource.getRepository(Productos);
            //consulta de bd por metodo find
            const  listaProductos= await repo.find(); //find es para jalar todos los datos

            //valido si trajo datos,sino devuelvo error
            if(listaProductos.length==0){
                return resp.status(404).json({message:"No hay datos registrados."});
            }

            console.log(listaProductos);
            //retorno los datos encontrados
            return resp.status(200).json(listaProductos);
        } catch (error) {
            return resp.status(404).json({message:"Error al acceder a la base de datos.."});
        }

    }

    static create= async(req: Request, resp: Response)=>{
        const repoProducto= AppDataSource.getRepository(Productos);

        try {
            // destructuring
            const {id,nombre,precio,stock,categoria}= req.body;

            //validar datos
            if(!id){
                return resp.status(400).json({message:"Debe indicar un id del producto"});
            }

            if(!nombre){
                return resp.status(400).json({message:"Debe indicar el nombre del producto"});
            }

            if(!precio){
                return resp.status(400).json({message:"Debe indicar el precio del producto"});
            }

            if(!stock){
                return resp.status(400).json({message:"Debe indicar el stock del producto"});
            }

            if(!categoria){
                return resp.status(400).json({message:"Debe indicar la categoria del producto"});
            }

            //regla de negocio

            //validar si el producto ya existe
            let product = await repoProducto.findOne({where:{id}}); //encuentre uno o falle donde id sea igual a id
            if(product){
                return resp.status(400).json({message:"Ese producto ya existe en la base de datos"});
            }

            if(stock<=0){
                return resp.status(400).json({message:"El stock debe ser mayor que 0."}); 
            }

            //instancia del onjeto Producto
            product = new Productos;

            product.id= id;
            product.nombre = nombre;
            product.precio = precio;
            product.categoria = categoria;
            product.stock = stock;
            product.estado = true;

            await repoProducto.save(product);
            

        } catch (error) {
            return resp.status(400).json({message:"Error al guardar."});
        }
        return resp.status(200).json("PRODUCTO GUARDADO CORRECTAMENTE");
    }

    static getOne= async(req: Request, resp: Response)=>{
        try {

            const id = parseInt(req.params['id']);
            // validacion de más, por lo que vimos en clase
            if(!id){
                return resp.status(400).json({message:"Debe indicar el ID"});
            }


            const repo= AppDataSource.getRepository(Productos);

            try {
                const producto= await repo.findOneOrFail({where:{id}});
                return resp.status(200).json(producto);
            } catch (error) {
                return resp.status(400).json({message:"El producto no existe en la base de datos"});
            }

        } catch (error) {
            
        }
    }

    static delete= async(req: Request, resp: Response)=>{
        try {
            const id = parseInt(req.params['id']);
            const repo= AppDataSource.getRepository(Productos);
            if(!id){
                return resp.status(400).json({message:"Debe indicar un ID válido"});
            }

            const producto= await repo.findOneBy({id});
            if(!producto){
                return resp.status(404).json({message:"ERROR AL ENCONTRAR EL PRODUCTO"});
            }

            await repo.delete(id);

        } catch (error) {
            return resp.status(500).json({message: "ERROR AL INTENTAR ELIMINAR EL PRODUCTO"});
        }

        return resp.status(200).json("PRODUCTO ELIMINADO CORRECTAMENTE");
    }

    static update= async(req: Request, resp: Response)=>{
        const id = parseInt(req.params['id']);
        const repo= AppDataSource.getRepository(Productos);

        try {
            if(!id){
                return resp.status(400).json({message:"Debe indicar un ID válido"});
            }

            const producto= await repo.findOneBy({id});
            if(!producto){
                return resp.status(404).json({message:"ERROR AL ENCONTRAR EL PRODUCTO"});
            }

            const {nombre,precio,stock,categoria}= req.body;

            //validar datos
            if(!nombre){
                return resp.status(400).json({message:"Debe indicar el nombre del producto"});
            }

            if(!precio){
                return resp.status(400).json({message:"Debe indicar el precio del producto"});
            }

            if(!stock){
                return resp.status(400).json({message:"Debe indicar el stock del producto"});
            }

            if(!categoria){
                return resp.status(400).json({message:"Debe indicar la categoria del producto"});
            }

        //Actualizacion de los datos de producto
        producto.nombre = nombre;
        producto.precio = precio;
        producto.categoria = categoria;
        producto.stock = stock;

        await repo.save(producto);

        } catch (error) {
            return resp.status(500).json({message: "ERROR AL INTENTAR ACTUALIZAR EL PRODUCTO"});

        }

        return resp.status(200).json("PRODUCTO ACTUALIZADO CORRECTAMENTE");

    }
}

export default ProductosController; //forma de exponer los objetos