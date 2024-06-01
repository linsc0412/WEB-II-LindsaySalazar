import { Request, Response } from "express";

class ProductosController{

    // cuando hago un llamado a un servidor y ahi dentro vendra la informacion
    // 
    static getAll= async(req: Request, resp: Response)=>{

        return resp.status(200).json("TODO BIEN EN GET ALL");
    }

    static create= async(req: Request, resp: Response)=>{

        return resp.status(200).json("TODO BIEN EN CREATE");

    }
}

export default ProductosController; //forma de exponer los objetos