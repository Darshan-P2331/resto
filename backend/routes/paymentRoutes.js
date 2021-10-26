const paymentRoutes = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const stripe = require("stripe")(`${process.env.STRIPE_API_SECRET}`);

paymentRoutes
  .route("/payment")
  .post(auth, paymentCtrl.createPayment)
  .get(auth, paymentCtrl.getPayments)
  
paymentRoutes.get('/all_payment',auth,authAdmin,paymentCtrl.getAllPayments)

module.exports = paymentRoutes;
