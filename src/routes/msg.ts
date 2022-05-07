import {Router} from "express";
import {authenticate} from "../middleware/authenticate";
import saveMsg from "../controller/msg";

const router = Router();

router.post( "/savemsg", authenticate, saveMsg );



export default router;