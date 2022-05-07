import {Router} from "express";
import {authenticate} from "../middleware/authenticate";
import {saveMsg, getMsg , updateMsg} from "../controller/msg";


const router = Router();

router.post( "/savemsg", authenticate, saveMsg );
router.get("/getmsg" , authenticate , getMsg );
router.get("/updatemsg" , authenticate , updateMsg);



export default router;