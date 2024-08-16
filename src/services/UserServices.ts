import { Service } from "typedi";
import UserRepositories from "../repositories/UserRepositories";
import "reflect-metadata";
import { UserLogin, UserSignUp } from "../dto/userDto";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string


@Service()
class UserServices {
    constructor(private readonly repository: UserRepositories) { }

    generateToken(id: string) {
        let token = jwt.sign({ id }, jwtSecret)
        return token;
    }

    async getAll() {
        let result = await this.repository.getAll()
        console.log(result)

        return {
            payload: result
        }
    }

    async signIn(data: UserLogin) {
        try {
            let { email, password } = data;
            let user = await this.repository.getByEmail(email);
            if (!user) {
                return {
                    payload: null,
                    success: false,
                    message: "User Not Found"
                }
            }

            //use bcrypt to compare password;
            let doMatch = await bcrypt.compare(password, user.password);

            if(!doMatch){
                return {
                    payload: null,
                    message: "Incorrect Password"
                }
            }
    

            //get token
            let token = this.generateToken(user._id);

            return {
                payload: user,
                token,
                message: "Logged in Successfully",
            }
        }
        catch (error: any) {
            return {
                error
            }
        }
    }

    async signUp(data: UserSignUp) {
        try {
            let { email, password, name } = data;
            let user = await this.repository.getByEmail(email);

            if (user) {
                return {
                    payload: null,
                    success: false,
                    message: "Email has been registered with an Account"
                }
            }

            //use bcrypt to compare password;
            password = await bcrypt.hash(password, 8)
            user = await this.repository.save({ email, password, name });


            //get token
            let token = this.generateToken(user._id);

            return {
                payload: user,
                token,
                message: "Logged in Successfully",
            }
        }
        catch (error: any) {
            return {
                error
            }
        }
    }

    async getUserById(id: string) {
        try {
            let user = await this.repository.getById(id);
            if (!user) {
                return {
                    payload: null,
                    success: false,
                    message: "User Not Found"
                }
            }

            return {
                payload: user
            }
        }
        catch (error: any) {
            return {
                error
            }
        }
    }
}

export default UserServices