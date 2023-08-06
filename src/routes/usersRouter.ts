import {Router} from "express";
import {create, deleteUser, getAll} from "../controllers/usersController";
const router = Router()

router.get('/', getAll)

router.post('/', create)

router.delete('/', deleteUser)

export default router;