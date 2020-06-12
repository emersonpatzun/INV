"use strict";

const express = require("express");
const api = express.Router();
const middleAuth = require("../middlewares/authentication");
const roleController = require("../controllers/role.controllers");

api.post("/roles", middleAuth.ensureAuth, roleController.createRole);
api.get("/roles", middleAuth.ensureAuth, roleController.listRole);
api.get("/roles/:id", middleAuth.ensureAuth, roleController.listRole);
api.put("/roles/:id", middleAuth.ensureAuth, roleController.updateRole);
api.delete("/roles/:id", middleAuth.ensureAuth, roleController.deleteRole);

module.exports = api;
