// Here were are exporting all function and passing in three arguments which all
// the various functions to connect to the specified collections mentioned in the index.js file
module.exports = (itemsCollection, cartCollection, brandCollection) => {
  // This function retrieve all items in the itemsCollection collection
  // If successful, it returns a JSON response containing the array of items.
  // If it encounters an error, it logs the error responds with status  500, 
  // and returns a JSON response.
  const viewProducts = async (req, res) => {
    try {
      const items = await itemsCollection.find().toArray();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving products." });
    }
  };

  // This function retrieves a single product from the database by its ID,
  // If the product is found, it is returned as a JSON response.
  // If the product is not found, it returns a a 404 status with a corresponding message.
  // If an error occurs a 500 status code is returned with a message.
  const viewSingleProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const item = await itemsCollection.findOne({ _id: id });

      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Product not found." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving product." });
    }
  };

  //This function retrieves all companies and returns them as JSON.
  // If there is an error, it logs the error and returns an error message.
  const viewCompanies = async (req, res) => {
    try {
      const items = await brandCollection.find().toArray();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving products." });
    }
  };

  // This function is responsible for adding a product to the shopping cart.
  // It first checks if the product exists in the itemsCollection.
  // If it doesn't exist, it returns a 404 error message. If the product exists,
  // it then checks if the product is already in the cartCollection.
  // If the product is already in the cart, it checks if the quantity of the product
  // in the cart is less than the maximum quantity available in the items collection.
  // If it is, it increments the quantity of the product in the cart and returns a response
  // with the updated quantity. If the maximum quantity has been reached,
  // it returns a 400 error message. If the product is not already in the cart,
  // it adds the product to the cartCollection with a quantity of 1 and returns a
  // response with the added item.
  const addToCart = async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await itemsCollection.findOne({ _id: id });

    if (!item) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    const cartItem = await cartCollection.findOne({ _id: id });

    if (cartItem) {
      if (cartItem.quantity < item.quantity) {
        await cartCollection.updateOne({ _id: id }, { $inc: { quantity: 1 } });
        res.status(201).json({ ...cartItem, quantity: cartItem.quantity + 1 });
      } else {
        res.status(400).json({ message: "Maximum quantity reached." });
      }
    } else {
      const newItem = { ...item, quantity: 1 };
      await cartCollection.insertOne(newItem);
      res.status(201).json(newItem);
    }
  };

  // This function retrieves all items from the shopping cart collection and returns
  // them as a JSON array. If an error occurs during the retrieval process,
  // it logs the error to the console and sends a 500 status code with a message.
  const viewShoppingCart = async (req, res) => {
    try {
      const cartArray = await cartCollection.find().toArray();
      res.json(cartArray);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving shopping cart." });
    }
  };

  // This function deles all items in the shopping cart. It remove all documents from 
  // the collection, and sends a response with a 204 status code indicating that 
  // the request was successful.
  const emptyShoppingCart = async (req, res) => {
    await cartCollection.deleteMany();
    res.status(204).end();
  };

  // This function deletes a single product from the shopping cart using it's id.
  // If the product is successfully deleted, it returns a 204 status code.
  // Otherwise, it returns a 404 status code with an error message.
  const deleteSingleProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await cartCollection.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found in cart." });
    }
  };

  // This function handles updating the quantity of an item in the shopping cart. 
  // It  ID and quantity from the request parameters and body. 
  // It then checks whether the provided quantity is valid and within the available quantity 
  // of the item.

  // Next, it checks whether the item is already in the cart. If the quantity is zero, 
  // it deletes the item from the cart. Otherwise, it updates the quantity of the item in 
  // the cart and sends a JSON response with the updated item. If the item is not in the cart, 
  // it sends a 404 error response.
  const updateQuantity = async (req, res) => {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const item = await itemsCollection.findOne({ _id: id });

    if (isNaN(quantity) || quantity < 0 || (item && quantity > item.quantity)) {
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
    viewCompanies,
  };
};
