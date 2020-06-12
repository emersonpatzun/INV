const Models = require("../models");
const Role = Models.role;
const RoleUser = Models.roleUser;
const User = Models.user;

//constants
const constants = require("../constants/constants");

//messages
const messages = require("../constants/messagesRoleUser");

async function createRoleUser(req, res) {
  const data = req.body;

  if (!data.iduser && data.idrole) {
    try {
      const roleUserExists = await User.findById(iduser);
      const roleExists = await Role.findById(idrole);
      if (!roleUserExists)
        res.status(400).send({ message: Response(WRONG_USER_ID) });
      else if (!roleExists)
        res.status(400).send({ message: Response(WRONG_ROLE_ID) });
      else {
        const roleUserCreated = await RoleUser.create({
          user: data.iduser,
          role: data.idrole,
        });
        if (!roleUserCreated) res.send({ message: Response(ROLEUSER_DELETED) });
        return res.send(roleUserCreated);
      }
    } catch (err) {
      res.status(500).send({ message: Response(INTERNAL_ERROR) });
    }
  }
  return res.send({ message: Response(REQUIRED_FIELDS) });
}

async function updateRoleUser(req, res) {
  const id = req.params.id;
  const data = req.body;

  if (!data.iduser || data.idrole) {
    try {
      const roleUser = await RoleUser.findOne({
        where: {
          [Op.or]: [{ iduser: data.iduser }, { idrole: data.idrole }],
        },
      });
      if (roleUserExists)
        res.status(400).send({ message: Response(EXISTING_ROLEUSER) });
      else {
        const roleUserUpdate = await RoleUser.update(data, {
          where: { iduserPoint: id },
        });
        if (!roleUserUpdate)
          res.send({ message: Response(COULD_NOT_EDIT_ROLEUSER) });
        return res.send(roleUserUpdate);
      }
    } catch (err) {
      res.status(500).send(Response(INTERNAL_ERROR));
      console.log(err);
    }
  }
  return res.send({ message: Response(REQUIRED_FIELDS) });
}

async function deleteRoleUser(req, res) {
  const iduser = req.body.iduser;
  const idroleUser = req.params.idroleUser;
  try {
    const roleUserExists = await User.findById(iduser);

    if (!roleUserExists)
      res.status(400).send({ message: Response(WRONG_USER_ID) });
    else {
      const roleUserRemoved = await RoleUser.destroy({
        where: { idroleUser: id },
      });
      if (!roleUserRemoved)
        res.send({ message: Response(COULD_NOT_GET_ROLEUSER) });
      return res.send({ message: Response(ROLEUSER_DELETED) });
    }
  } catch (err) {
    res.status(500).send(Response(INTERNAL_ERROR));
    console.log(err);
  }
}

async function listRoleUser(req, res) {
  try {
    const roleUser = await RoleUser.findAll({});
    if (!roleUser) res.status(400).send({ COULD_NOT_GET_ROLEUSER });
    else {
      if (
        !roleUser.length
          ? res.send(roleUser)
          : res.send({ message: Response(NO_ROLEUSER_SEE) })
      );
      return res.send(roleUser);
    }
  } catch (err) {
    res.status(500).send({ message: Response(INTERNAL_ERROR) });
    console.log(err);
  }
}

module.exports = {
  createRoleUser,
  updateRoleUser,
  deleteRoleUser,
  listRoleUser,
};
