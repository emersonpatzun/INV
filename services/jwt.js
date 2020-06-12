"user strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const key = "claver super secreta";

exports.createToken = (user) => {
  var payload = {
    sub: user.iduser,
    userName: user.userName,
    email: user.email,
    password: user.password,
    lat: moment().unix(),
    exp: moment().add(6, "hours").unix(),
  };
  return jwt.encode(payload, key);
};
