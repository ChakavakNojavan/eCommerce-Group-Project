"use strict";
console.log("Starting server...");

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
(async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  const db = client.db("shop");
  const itemsCollection = db.collection("watches");
  const cartCollection = db.collection("cart");
  const brandCollection = db.collection("companies");

  const handlers = require("./handlers")(
    itemsCollection,
    cartCollection,
    brandCollection
  );
  const { updateStock } = require("./handlers2")
  const express = require("express");
  const morgan = require("morgan");
  const cors = require("cors");
  const PORT = 4000;

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
    .use(morgan("tiny"))
    .use(express.static("./server/assets"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))
    .use(cors())
    // REST endpoints?
    .get("/api/products", (req, res, next) => {
      console.log("Handling request to view products...");
      handlers.viewProducts(req, res, next);
    })
    .get("/api/products/:id", (req, res) =>
      handlers.viewSingleProduct(req, res)
    )
    .get("/api/companies", (req, res, next) => {
      console.log("Handling request to view products...");
      handlers.viewCompanies(req, res, next);
    })
    .get("/api/cart", (req, res) => handlers.viewShoppingCart(req, res))
    .post("/api/cart/:id", (req, res) => handlers.addToCart(req, res))
    .delete("/api/cart", (req, res) => handlers.emptyShoppingCart(req, res))
    .delete("/api/cart/:id", (req, res) =>
      handlers.deleteSingleProduct(req, res)
    )
    .patch("/api/cart/:id", (req, res) => handlers.updateQuantity(req, res))
    .patch("/update-stock", (req,res) => updateStock(req,res) )
    .listen(PORT, () => console.info(`Listening on port ${PORT}`));
  process.on("SIGINT", async () => {
    console.log("Closing server...");
    await client.close();
    process.exit();
  });
})();
