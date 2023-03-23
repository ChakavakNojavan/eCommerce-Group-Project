module.exports = (itemsCollection, cartCollection, brandCollection) => {
  const viewProducts = async (req, res) => {
    console.log("Handling request to view products...");
    try {
      const items = await itemsCollection.find().toArray();
      console.log("Retrieved items:", items);
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving products." });
    }
  };
  const viewCompanies = async (req, res) => {
    console.log("Handling request to view products...");
    try {
      const items = await brandCollection.find().toArray();
      console.log("Retrieved items:", items);
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving products." });
    }
  };

  const viewSingleProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const item = await itemsCollection.findOne({ _id: id });
      console.log("ID:", id);

      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Product not found." });
      }
    } catch (err) {
      res.status(500).json({ message: "Error retrieving product." });
    }
  };

  const addToCart = async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await itemsCollection.findOne({ _id: id });

    console.log("ID:", id);

    if (!item) {
      res.status(404).json({ message: "Product not found." });
      return;
    }
    const cartItem = await cartCollection.findOne({ _id: id });

    if (cartItem) {
      await cartCollection.updateOne({ _id: id }, { $inc: { quantity: 1 } });
      res.status(201).json({ ...cartItem, quantity: cartItem.quantity + 1 });
    } else {
      const newItem = { ...item, quantity: 1 };
      await cartCollection.insertOne(newItem);
      res.status(201).json(newItem);
    }
  };

  const viewShoppingCart = async (req, res) => {
    try {
      const cartArray = await cartCollection.find().toArray();
      res.json(cartArray);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving shopping cart." });
    }
  };

  const emptyShoppingCart = async (req, res) => {
    await cartCollection.deleteMany();
    res.status(204).end();
  };

  const deleteSingleProduct = async (req, res) => {
    const id = parseInt(req.params.id);

    const result = await cartCollection.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found in cart." });
    }
  };

  const updateQuantity = async (req, res) => {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;

    if (isNaN(quantity) || quantity < 0) {
      res.status(400).json({ message: "Invalid quantity value." });
      return;
    }

    const cartItem = await cartCollection.findOne({ _id: id });

    if (cartItem) {
      if (quantity === 0) {
        await cartCollection.deleteOne({ _id: id });
        res.status(204).end();
      } else {
        await cartCollection.updateOne({ _id: id }, { $set: { quantity } });
        res.json({ ...cartItem, quantity });
      }
    } else {
      res.status(404).json({ message: "Product not found in cart." });
    }
  };

  return {
    viewProducts,
    viewSingleProduct,
    viewShoppingCart,
    addToCart,
    emptyShoppingCart,
    deleteSingleProduct,
    updateQuantity,
    viewCompanies
  };
};
