require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require('path')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    console.log("Connected to mongodb");
  }
);

app.use("/user", require('./routes/userRoutes'));
app.use("/api", require('./routes/categoryRoutes'));
app.use("/api", require('./routes/productRoutes'));
app.use("/api", require("./routes/uploadRoutes"));
app.use("/api", require("./routes/paymentRoutes"));


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`serve at http://localhost:${PORT}`);
});
