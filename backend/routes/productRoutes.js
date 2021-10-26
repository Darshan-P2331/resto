const productRouter = require("express").Router()
const productCtrl = require("../controllers/productCtrl.js");
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

productRouter
  .route("/products")
  .get(productCtrl.getProducts)
  .post(auth,authAdmin,productCtrl.createProduct);

productRouter
  .route("/products/:id")
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct);

module.exports = productRouter;
