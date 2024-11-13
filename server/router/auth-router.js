const express = require("express")
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const { registerAdmin, loginAuth, verifyOtp } = require("../controllers/adminAuth.controllers");
const authMiddleware = require("../middleware/auth-middleware")

router.route("/").get(authControllers.home)
router.route("/insertproduct").post(authControllers.insertProduct);
router.route("/scanproduct").post(authControllers.scanProduct)
router.route("/register").post(registerAdmin)
router.route("/login").post(loginAuth)
router.route("/getproducts").post(authControllers.getProducts);
router.route("/productdetail").post(authControllers.productDetails)
router.route("/updateproduct").post(authControllers.updateProduct)
router.route("/verifyotp/:email").post(verifyOtp)
router.route("/soldproducts").post(authControllers.soldProducts)
router.route("/addtocart").post(authMiddleware, authControllers.addToCart)
router.route("/deletecart").delete(authMiddleware, authControllers.deleteCart)
router.route("/deleteitemincart").post(authMiddleware, authControllers.deleteItem)
router.route("/updatestock").post(authMiddleware, authControllers.updateStock)
router.route("/getcartitems").get(authMiddleware, authControllers.getCartItems)

module.exports = router