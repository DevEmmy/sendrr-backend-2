import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { Service } from "typedi";
import "reflect-metadata";


@Service()
class UserController{
    constructor(private readonly service : UserServices){}

    async  getAll(req: Request, res: Response){
        try{
            let result = await this.service.getAll();
            console.log(result)
            if(!result.payload){
                return res.status(400).json(result);
            }

            return res.json(result);
        }   
        catch(err: any){
            console.log(err)
            return res.status(401).json(err)
        }
    }

    async signUp(req: Request, res: Response){
        try{
            let body = req.body;
            let result = await this.service.signUp(body);

            if(!result.payload){
                return res.status(400).json(result);
            }

            return res.json(result);
        }   
        catch(err: any){
            return res.status(401).json(err)
        }
    }

    async signIn(req: Request, res: Response){
        try{
            let body = req.body;
            let result = await this.service.signIn(body);

            if(!result.payload){
                return res.status(400).json(result);
            }

            return res.json(result);
        }   
        catch(err: any){
            return res.status(401).json(err)
        }
    }
}

export default UserController