import { Service } from "typedi";
import "reflect-metadata";
import User, { IUser } from "../models/user.model";
import { UserDto } from "../dto/userDto";


@Service()
class UserRepositories{
    constructor(private readonly model = User){}

    async save(data: UserDto){
        let result = await new this.model(data).save();
        return result
    }

    async getAll(){
        let result = await this.model.find();
        return result;
    }

    async getById(id: string){
        let result = await this.model.findById(id);
        return result;
    }

    async getByEmail(email: string){
        let result = await this.model.findOne({email});
        return result;
    }

    async update(id: string, data: UserDto){
        let result = await this.model.findByIdAndUpdate(id, data, {new: true});
        return result;
    }
}

export default UserRepositories;