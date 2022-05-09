import {Router} from "express";
import {authenticate} from "../middleware/authenticate";
import {saveMsg, getMsg , updateMsg , uploadFile} from "../controller/msg";

import os from "os";
import multer from "multer";
const upload = multer({ dest: '../../uploads' });

const router = Router();

router.post( "/savemsg", authenticate, saveMsg );
router.get("/getmsg" , authenticate , getMsg );
router.get("/updatemsg" , authenticate , updateMsg);
router.post("/upload" , authenticate , upload.single("file"), uploadFile);



export default router;