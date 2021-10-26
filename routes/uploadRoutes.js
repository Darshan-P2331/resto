const uploadRouter = require("express").Router();
const uploadCtrl = require("../controllers/uploadCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const uploadImage = require("../middlewares/uploadImage");


uploadRouter.post('/upload_avatar',uploadImage,auth,uploadCtrl.uploadAvatar)

// Upload image
uploadRouter.post("/upload",uploadImage, auth, authAdmin, uploadCtrl.uploadProductImg);

// Upload image
uploadRouter.post("/upload_category",uploadImage, auth, authAdmin, uploadCtrl.uploadCategoryImg);

//Delete  image
uploadRouter.post("/destroy", auth, authAdmin, uploadCtrl.delete);


module.exports = uploadRouter;
