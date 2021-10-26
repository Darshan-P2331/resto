const categoryRouter = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl.js')
const auth = require('../middlewares/auth.js')
const authAdmin = require('../middlewares/authAdmin.js')

categoryRouter
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(auth,authAdmin,categoryCtrl.createCategory);

categoryRouter
  .route("/category/:id")
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .put(auth, authAdmin, categoryCtrl.updateCategory);

module.exports = categoryRouter;
