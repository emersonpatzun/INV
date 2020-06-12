const Models = require("../models");
const Role = Models.role;

//constants
const constants = require("../constants/constants.js");

//messages
const messages = require("../constants/messagesRole.js");

async function createRole(req, res) {
  const data = req.body;

  if (!data.description) {
    try {
      const roleExists = await Role.findOne({
        where: {
          description: data.description,
        },
      });

      if (roleExists)
        res.status(400).send({ message: Response(EXISTING_ROLE) });
      else {
        const createdRole = await Role.create.create({
          description: data.description,
          state: Response(ACTIVE),
        });
        if (!createdRole) res.send({ message: Response(ROLE_NOT_ADDED) });
        return res.send(createdRole);
      }
    } catch (err) {
      res.status(500).send(Response(INTERNAL_ERROR));
      console.log(err);
    }
  }
  return res.send({ message: Response(REQUIRED_FIELDS) });
}

async function updateRole(req, res) {
  const id = req.params.id;
  const data = req.body;

  if (!data.description) {
    try {
      const roleExists = await Role.findOne({
        where: {
          description: data.description,
        },
      });

      if (roleExists)
        res.status(400).send({ message: Response(EXISTING_ROLE) });
      const roleUpdate = await Role.update(data, { where: { idrole: id } });
      if (!roleUpdate) res.send({ message: Response(COULD_NOT_EDIT_ROLE) });
      return res.send(roleUpdate);
    } catch (err) {
      res.status(500).send(Response(INTERNAL_ERROR));
      console.log(err);
    }
  }

  return res.send({ message: Response(REQUIRED_FIELDS) });
}

async function deleteRole(req, res) {
  const id = req.params.id;

  try {
    const roleExists = await Role.findById(id);

    if (!roleExists) res.status(400).send({ message: Response(WRONG_ID) });
    else {
      const roleDeleted = await Role.destroy({ where: { idrole: id } });
      if (!roleDeleted) res.send({ message: Response(CANNOT_DELETE_ROLE) });
      return res.send({ message: Response(ROLE_DELETED) });
    }
  } catch (err) {
    res.status(500).send(Response(INTERNAL_ERROR));
    console.log(err);
  }
}

async function listRole(req, res) {
  try {
    const point = await Role.findAll({ where: { state: Response(ACTIVE) } });
    if (!point)
      res.status(400).send({ message: Response(IMPOSSIIBLE_TO_GET_ROLE) });
    else {
      if (
        !point.length
          ? res.send(point)
          : res.send({ message: Response(ROLE_NOT_AVAILABLE) })
      );
      return res.send(point);
    }
  } catch (err) {
    res.status(500).send(Response(INTERNAL_ERROR));
    console.log(err);
  }
}

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  listRole,
};
