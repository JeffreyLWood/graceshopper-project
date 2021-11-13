const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Cart, Instrument, User },
} = require("../db");

module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();
    console.log("USER=>", user);
    // await cart.purchaseCart();
    // console.log("after", cart);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Add item to cart, put request to cart, adds to items
router.put("/:userId", async (req, res, next) => {
  try {
    // //const cart = Cart.findByPk(req.params.cartId);
    // await Cart.update(
    //   {
    //     items: Sequelize.fn(
    //       'array_append',
    //       Sequelize.col('items'),
    //       req.body
    //     ),
    //   },
    //   { where: { id: req.params.cartId } }
    // );
    // //const item = await Instrument.findByPk(req.body);

    // res.status(200).send();
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();
    let found = false;
    let mappedCart = cart.items.map((item) => {
      if (item.id === req.body.id) {
        item.quantity++;
        found = true;
      }
      return item;
    });
    cart.items = [...mappedCart];
    if (found === false) {
      cart.items = [...cart.items, req.body];
    }
    await cart.changed("items", true);
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cartId/:itemId", async (req, res, next) => {
  try {
    const { items } = await Cart.findByPk(req.params.cartId);
    const itemIdx = items.indexOf(Number(req.params.itemId));
    items.splice(itemIdx, 1);
    await Cart.update(items, { where: { id: req.params.cartId } });
    res.status(202).send();
  } catch (err) {
    next(err);
  }
});
