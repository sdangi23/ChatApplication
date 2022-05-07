import {Router} from "express";
import checkInputs from "../middleware/checkInputs";
import { signUp, logIn } from "../controller/user";
const router = Router();

router.post( "/signup", checkInputs, signUp );
router.post( "/login", logIn );


export default router;