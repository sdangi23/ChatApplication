import {Router} from "express";
import {authenticate} from "../middleware/authenticate";
import {createGrp , getGrps} from "../controller/grp";


const router = Router();

router.post( "/createGrp", authenticate , createGrp );
router.get("/getGrps" , authenticate , getGrps);




export default router;