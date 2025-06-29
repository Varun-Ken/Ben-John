import {Router} from "express"
import { getAllOrders, updateOrderStatus } from "../controllers/admin/adminOrderController.js"

const router = Router()

router.get("/orders",getAllOrders)
router.post("/update/:orderId",updateOrderStatus)

export default router