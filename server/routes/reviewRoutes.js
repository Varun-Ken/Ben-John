import { Router } from "express";
import { addReview, getProductReviews } from "../controllers/shop/reviewController.js";

const router = Router()

router.get("/:productId",getProductReviews)
router.post("/add",addReview)

export default router