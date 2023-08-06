import {Request, Response, Router} from "express";
import usersRouter from "./usersRouter";
import authRouter from "./authRouter";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
	res.status(200).json({working: true});
});

router.use("/users", usersRouter);
router.use("/auth", authRouter);

export default router;