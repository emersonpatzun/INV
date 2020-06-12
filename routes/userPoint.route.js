"use strict";

const express = require("express");
const api = express.Router();
const midddleAuth = require("../middlewares/authentication");
const userPointController = require("../controllers/userPoint.controller");

api.post(
  "/userPoint",
  midddleAuth.ensureAuth,
  userPointController.createUserPoint
);
api.get(
  "/userPoint",
  midddleAuth.ensureAuth,
  userPointController.listUserPoint
);
api.get(
  "/userPoint/:id",
  midddleAuth.ensureAuth,
  userPointController.listUserPoint
);
api.delete(
  "/userPoint/:id",
  midddleAuth.ensureAuth,
  userPointController.deleteUserPoint
);

module.exports = api;
