// This enables strict mode
"use strict";

//Connecting to MongoDB with Node.js using dotenv and MongoClient
// An options object is created to enable specific MongoDB driver
// functionality.
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
(async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  // This sets up different MongoDB collections for the shop database using the
  // These collections can be used to perform various CRUD operations on the documents stored in
  // the their collections.

  // db is set to the shop database using client.db("shop").
  const db = client.db("shop");
  // itemsCollection is set to the watches collection within the shop database using db.collection("watches").
  const itemsCollection = db.collection("watches");
  // cartCollection is set to the cart collection within the shop database using db.collection("cart").
  const cartCollection = db.collection("cart");
  // brandCollection is set to the companies collection within the shop database using db.collection("companies").
  const brandCollection = db.collection("companies");

  //Were are requiring the handlers from the "./handlers.js and setting them to a function with 3 arguments so they
  // can be called while using the different CRUD methods with the database.
  const handlers = require("./handlers")(
    itemsCollection,
    cartCollection,
    brandCollection
  );
    // This destructures the function updateStock and calling it from the "./handlers2.js" file
  const { updateStock } = require("./handlers2");


  // These packages are commonly used in Node.js applications to set up a server, log server requests,
  // and enable cross-origin resource sharing.
  const express = require("express");
  const morgan = require("morgan");
  const cors = require("cors");
  // Additionally, this code block sets the PORT constant to 4000, which is the port
  // number that the server will listen on.
  const PORT = 4000;

  // Access-Control-Allow-Methods: Specifies the HTTP methods that are allowed for the server.
  // Access-Control-Allow-Headers: Specifies the request headers that are allowed for the server.
  express()
    .use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Methods",
        "OPTIONS, HEAD, GET, PUT, POST, DELETE"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    })



    // This function logs HTTP requests to the console using the "tiny" format.
    .use(morgan("tiny"))
    // This function serves static files located in the ./server/assets directory.
    .use(express.static("./server/assets"))
    // This function parses incoming JSON data and makes it available in req.body.
    .use(express.json())
    // This function parses incoming URL-encoded data and makes it available in req.body.
    .use(express.urlencoded({ extended: false }))
    // This function serves static files located in the root directory of the project.
    .use("/", express.static(__dirname + "/"))
    // This function enables cross-origin resource sharing (CORS) for all routes.
    .use(cors())

    // REST endpoints
    //this uses a get route to retrieve all products
    .get("/api/products", (req, res, next) => {
      handlers.viewProducts(req, res, next);
    })
    //this uses a get route to retrieve a single product
    .get("/api/products/:id", (req, res) =>
      handlers.viewSingleProduct(req, res)
    )
    //this uses a get route to retrieve all companies
    .get("/api/companies", (req, res, next) => {
      handlers.viewCompanies(req, res, next);
    })
    // this uses a get route to retrieve the current contents of the shopping cart.
    .get("/api/cart", (req, res) => handlers.viewShoppingCart(req, res))
    //this uses a post route to add a product to the shopping cart with the specified ID.
    .post("/api/cart/:id", (req, res) => handlers.addToCart(req, res))
    // this uses a patch route update the quantity of a product with the specified ID in the shopping cart.
    .patch("/api/cart/:id", (req, res) => handlers.updateQuantity(req, res))
    //this uses a patch route to update the stock quantity of products in the database.
    .patch("/update-stock", (req, res) => updateStock(req, res))
    // this uses the delete route to empty the shopping cart.
    .delete("/api/cart", (req, res) => handlers.emptyShoppingCart(req, res))
    //this uses the delete route to remove a product with the specified ID from the shopping cart.
    .delete("/api/cart/:id", (req, res) =>
      handlers.deleteSingleProduct(req, res)
    )

    //this will listen on PORT that was defined above, 4000, and will console log which port you are listening on.
    .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  //this shutdown the connection to Mongodb when you, the user kills the terminal
  process.on("SIGINT", async () => {
    await client.close();
    process.exit();
  });
})();
