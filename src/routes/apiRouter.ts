import {Request, Response, Router} from "express";
import usersRouter from "./usersRouter";
import authRouter from "./authRouter";
import itemsRouter from "./itemsRouter";
import ordersRouter from "./ordersRouter";
import verifyToken from "../middleware/verifyToken";

const router = Router();

//				'/api'

router.get("/", verifyToken, (req: Request, res: Response): void => {
	res.status(200).json({working: true});
});

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/items", itemsRouter);
router.use("/orders", ordersRouter);

export default router;