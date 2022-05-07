import {Router} from "express";
import {authenticate} from "../middleware/authenticate";
import {saveMsg} from "../controller/msg";
import {getMsg} from '../controller/msg';

const router = Router();

router.post( "/savemsg", authenticate, saveMsg );
router.get("/getmsg" , authenticate , getMsg );



export default router;