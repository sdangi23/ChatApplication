import {Router} from "express";
import checkInputs from "../middleware/checkInputs";
import { signUp } from "../controller/user";
const router = Router();

router.post( "/signup", checkInputs, signUp );


export default router;