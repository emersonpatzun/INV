'use strict'

//modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//routes
const userRoutes = require("./routes/user.route");
const userPointRoutes = require("./routes/userPoint.route");
const pointOfSaleRoutes = require("./routes/pointOfSale.route");
const productRoutes = require("./routes/product.route");
const roleRoutes = require("./routes/role.route");
const roleUserRoutes = require("./routes/roleUser.route");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  "/",
  userRoutes,
  userPointRoutes,
  pointOfSaleRoutes,
  productRoutes,
  roleRoutes,
  roleUserRoutes
);

module.exports = app;
