import {Router} from "express"
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "../controllers/shop/addressController.js"

const router = Router()

router.post("/add",addAddress)
router.put("/edit/:userId/:addressId",editAddress)
router.get("/get/:userId",fetchAllAddress)
router.delete("/delete/:userId/:addressId",deleteAddress)

export default router