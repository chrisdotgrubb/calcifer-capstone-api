import {Router} from "express";
import {create, deleteOrder, edit, index, show} from "../controllers/ordersController";


const router = Router();

//				'/api/orders'

router.get("/", index);
router.get("/:orderId", show);

router.delete("/:orderId", deleteOrder);

router.put("/:orderId", edit);

router.post("/", create);

export default router;