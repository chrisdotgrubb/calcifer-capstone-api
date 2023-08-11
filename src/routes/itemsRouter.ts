import {Router} from "express";
import {create, deleteItem, edit, index, show} from "../controllers/itemsController";

const router = Router();

//				'/api/items'
router.get("/", index);
router.get("/:itemId", show);

router.delete("/:itemId", deleteItem);

router.put("/:itemId", edit);

router.post("/", create);

export default router;