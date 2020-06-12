"use strict";

const express = require("express");
const api = express.Router();
const middleAuth = require("../middlewares/authentication");
const roleUserController = require("../controllers/roleUser.controllers");

api.post(
  "/roleUsers",
  middleAuth.ensureAuth,
  roleUserController.createRoleUser
);
api.get("/roleUsers", middleAuth.ensureAuth, roleUserController.listRoleUser);
api.get(
  "/roleUsers/:id",
  middleAuth.ensureAuth,
  roleUserController.listRoleUser
);
api.put(
  "/roleUsers/:id",
  middleAuth.ensureAuth,
  roleUserController.updateRoleUser
);
api.delete(
  "/roleUsers/:id",
  middleAuth.ensureAuth,
  roleUserController.deleteRoleUser
);

module.exports = api;
