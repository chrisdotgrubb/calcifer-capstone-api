import {Router} from "express";
import {login, logout, refresh} from "../controllers/authController";

const router = Router();

//				'/api'

router.get("/refresh", refresh);

router.post("/", login);
router.post("/logout", logout);

export default router;