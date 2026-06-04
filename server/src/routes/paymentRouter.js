const express= require("express");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { createOrder, verifyPayment } = require("../controllers/paymentControllers");
const router = express.Router();


//ye payement se related hai, isliye course router me add kiya hai
router.post("/create-order", AuthMiddleware, createOrder);
router.post("/verify", AuthMiddleware, verifyPayment);

module.exports = router;