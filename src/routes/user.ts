import {Router} from "express";
import checkInputs from "../middleware/checkInputs";
import { signUp, logIn, getUsers } from "../controller/user";
const router = Router();

router.post( "/signup", checkInputs, signUp );
router.post( "/login", logIn );
router.get("/getusers" , getUsers);


export default router;