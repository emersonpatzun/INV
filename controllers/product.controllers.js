const Models = require("../models");
const Product = Models.product;

//constants
const constants = require("../constants/constants");

//messages
const messages = require("../constants/messagesProduct");

async function createProduct(req, res) {
  const data = req.body;

  if (data.name && data.category && data.miniumStock) {
    try {
      const productExists = await Product.findOne({
        where: {
          name: data.name,
          category: data.category,
          miniumStock: data.miniumStock,
        },
      });

      if (productExists)
        res.status(400).send({ message: messages.EXISTING_PRODUCT });
      else {
        const createdProduct = await Product.create({
          name: data.name,
          category: data.category,
          miniumStock: data.miniumStock,
          state: Response(ACTIVE),
        });
        if (!createdProduct) res.send({ message: messages.PRODUCT_NOT_ADDED });
        else res.send(createdProduct);
      }
    } catch (err) {
      res.status(500).send(messages.INTERNAR_ERROR);
      console.log(err);
    }
  } else {
    res.send({ message: messages.REQUIRED_FIELDS });
  }
}

async function updateProduct(req, res) {
  const id = req.params.id;
  const data = req.body;

  if (data.name || data.category || data.miniumStock || state.state) {
    try {
      const productExists = await Product.findOne({
        where: {
          [Op.or]: [
            { name: data.name },
            { category: data.category },
            { miniumStock: data.miniumStock },
            { state: data.state },
          ],
        },
      });

      if (productExists)
        res.status(400).send({ message: messages.EXISTING_PRODUCT });
      else {
        const productUpdate = await Product.update(data, {
          where: { idproduct: id },
        });
        if (!productUpdate)
          res.send({ message: messages.COULD_NOT_EDIT_PRODUCT });
        else res.send(productUpdate);
      }
    } catch (err) {
      res.status(500).send(messages.INTERNAR_ERROR);
      console.log(err);
    }
  } else {
    res.send({ message: messages.REQUIRED_FIELDS });
  }
}

async function deleteProduct(req, res) {
  const id = req.params.id;

  try {
    const productExists = await Product.finById(id);

    if (!productExists) res.status(400).send({ message: messages.WRONG_ID });
    else {
      const hasTransactions = await Transacion.findAll({
        where: { idproduct: id },
      });
      if (hasTransactions) {
        await Product.update(
          { state: constants.INACTIVE },
          { where: { idproduct: id } }
        );
        res.send({ message: messages.UPDATE });
      } else {
        const productDelete = await Product.destroy({ where: { idproduct: id } });
        if (!productDelete)
          res.send({ message: messages.CANNOT_DELETE_PRODUCT });
        else {
          res.send({ message: messages.DELETE_PRODUCT });
        }
      }
    }
  } catch (err) {
    res.status(500).send(messages.INTERNAR_ERROR);
    console.log(err);
  }
}

async function listProduct(req, res) {
  try {
    const product = await Product.findAll({ where: { state: constantsACTIVE } });
    if (!product)
      res.status(400).send({ message: messages.PRODUCT_NOT_AVAILABLE });
    else {
      if (product.length == 0)
        res.send({ message: messages.PRODUCT_NOT_AVAILABLE });
      else {
        res.send(product);
      }
    }
  } catch (err) {
    res.status(500).send({ message: messages.INTERNAL_ERROR });
    console.log(err);
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  listProduct,
};
