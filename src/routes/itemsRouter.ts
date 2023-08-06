import {Router} from "express";
import {index, show, create, edit, deleteItem} from "../controllers/itemsController";

const router = Router();

//				'/api/items'
router.get("/", index);
router.get("/:itemId", show);

router.delete("/:itemId", deleteItem);

router.put("/:itemId", edit);

router.post("/", create);

export default router;