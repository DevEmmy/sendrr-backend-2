import {Router} from "express";
import Container from "typedi";
import UserController from "../controllers/UserController";

const router = Router();
const userController = Container.get(UserController);

router.post("/sign-in", (req, res)=> userController.signIn(req, res))
router.post("/sign-up", (req, res)=> userController.signUp(req, res))

export default router