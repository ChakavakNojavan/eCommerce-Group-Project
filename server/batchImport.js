const items = require("./data/items.json");
const companies = require("./data/companies.json");

const { MongoClient, Db } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("shop");

    await db.collection("watches").insertMany(items);
    await db.collection("companies").insertMany(companies);
    await db.collection("cart").insertMany(cart);
    console.log("great success, very nice");
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};


batchImport();