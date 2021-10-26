const userRouter = require('express').Router()
const userCtrl = require('../controllers/userCtrl.js')
const auth = require('../middlewares/auth.js')
const authAdmin = require('../middlewares/authAdmin.js')

userRouter.post('/register',userCtrl.register)
userRouter.post('/activation',userCtrl.activateEmail)
userRouter.post('/login',userCtrl.login)
userRouter.post("/refresh_token", userCtrl.getAccessToken);
userRouter.post("/forgot", userCtrl.forgotPassword);
userRouter.post("/reset", auth, userCtrl.resetPassword);
userRouter.get("/info", auth, userCtrl.getUserInfo);
userRouter.get("/all_info", auth, authAdmin, userCtrl.getUsersAllInfo);
userRouter.get("/logout", userCtrl.logout);
userRouter.patch("/update",auth, userCtrl.updateUser);
userRouter.patch("/addcart",auth, userCtrl.addCart);
userRouter.patch("/update_role/:id",auth,authAdmin, userCtrl.updateUsersRole);
userRouter.delete("/delete/:id",auth,authAdmin, userCtrl.deleteUser);

module.exports = userRouter