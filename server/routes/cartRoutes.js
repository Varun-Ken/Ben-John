import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQty,
} from "../controllers/shop/cartController.js";

const router = Router();

router.post("/add", addToCart);
router.put("/updatecart", updateCartItemQty); 
router.get("/get/:userId", getCartItems);
router.delete("/delete/:userId/:productId", deleteCartItem);

export default router;
