const Models = require("../models");
const User = Models.User;
const UserPoint = Models.userPoint;
const PointOfSale = Models.pointOfSale;

//messages
const messages = require("../constants/messagesUserPoint");

async function createUserPoint(req, res) {
  const data = req.body;

  if (data.idUser && data.idPointOfSale) {
    try {
      const userExists = await User.findById(idUser);
      const pointOfSaleExists = await PointOfSale.findById(idPointOfSale);
      if (!userExists)
        res.status(400).send({ message: messages.EXISTING_USERPOINT });
      else if (!pointOfSaleExists)
        res.status(400).send({ message: messages.WRONG_USER_ID });
      else {
        const userPointCreated = await UserPoint.create({
          user: data.idUser,
          pointOfSale: idPointOfSale,
        });
        if (!userPointCreated)
          res.send({ message: messages.COULD_NOT_CREATE_USERPOINT });
        else res.send(userPointCreated);
      }
    } catch (err) {
      res.status(500).send({ message: messages.INTERNAL_ERROR });
    }
  } else {
    res.status(400).send({ message: messages.REQUIRED_FIELDS });
  }
}

async function deleteUserPoint(req, res) {
  const idUser = req.body.idUser;
  const idUserPoint = req.params.idUserPoint;
  try {
    const userExists = await User.findById(idUser);

    if (!userExists) res.status(400).send({ message: messages.WRONG_USER_ID });
    else {
      const userPointRemoved = await UserPoint.destroy({
        where: { idUserPoint: idUserPoint },
      });
      if (!userPointRemoved) res.send({ message: messages.WRONG_POINT_ID });
      else res.send({ message: messages.DELETED });
    }
  } catch (err) {
    res.status(500).send({ message: messages.INTERNAL_ERROR });
    console.log(err);
  }
}

async function listUserPoint(req, res) {
  try {
    const userPoints = await UserPoint.findAll({});
    if (!userPoints)
      res.status(400).send({ message: messages.COULD_NOT_GET_USERPOINT });
    else {
      if (userPoints.length == 0)
        res.send({ message: messages.NO_USERPOINT_SEE });
      else res.send(userPoints);
    }
  } catch (err) {
    res.status(500).send({ message: messages.INTERNAL_ERROR });
  }
}

module.exports = {
  createUserPoint,
  deleteUserPoint,
  listUserPoint,
};
