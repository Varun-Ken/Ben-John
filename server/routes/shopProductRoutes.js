import {Router} from "express"
import { getFilteredProducts, getProductDetails } from "../controllers/shop/ProductsController.js"
const route = Router()

route.get("/get",getFilteredProducts)
route.get("/get/:id",getProductDetails)

export default route