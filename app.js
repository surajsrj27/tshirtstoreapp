const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require('config');
const path = require('path');

// require("dotenv").config();

//bring all routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

//DB Config
const db = config.get('mongoURI');

//DB Connection //process.env.DATABASE
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("mongoDB connected!!");
  })
  .catch(err => console.log(err));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Actual Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('projfrontend/build'));

  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'projfrontend', 'build', 'index.html'));
  });
}

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
