import {Router} from "express";
import {authenticate} from "../middleware/authenticate";
import {createGrp , getGrps , removeUser} from "../controller/grp";


const router = Router();

router.post( "/createGrp", authenticate , createGrp );
router.get("/getGrps" , authenticate , getGrps);
router.post("/removeuser" , authenticate , removeUser);




export default router;