import {Router} from "express";
import Container from "typedi";
import UserController from "../controllers/UserController";

const router = Router();
const userController = Container.get(UserController);

router.get("/", (req, res)=> userController.getAll(req, res))

export default router