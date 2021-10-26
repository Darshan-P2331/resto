const cloudinary = require("cloudinary");
const fs = require("fs");

//upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCtrl = {
  uploadAvatar: async (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "Resto/avatar",
          width: 150,
          height: 150,
          crop: "fill",
        },
        async (err, result) => {
          if (err) throw err;
          removeTmp(file.tempFilePath);

          res.json({ url: result.secure_url, public_id: result.public_id });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  uploadProductImg: (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "Resto/products" },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);
          res.json({ public_id: result.public_id, url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  uploadCategoryImg: (req,res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "Resto/category" },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);
          res.json({ public_id: result.public_id, url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  delete: (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id) return res.status(400).json({ msg: "No image selected" });

      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;

        res.json({ msg: "Deleted image" });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadCtrl;
