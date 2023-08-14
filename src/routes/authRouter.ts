import {Router} from "express";
import {login, logout, refresh} from "../controllers/authController";
import loginLimiter from "../middleware/loginLimiter";

const router = Router();

//				'/api/auth'

router.get("/refresh", refresh);

router.post("/", loginLimiter, login);
router.post("/logout", logout);

export default router;