const items = require("./data/items.json");
const companies = require("./data/companies.json");

//Connecting to MongoDB with Node.js using dotenv and MongoClient
const { MongoClient} = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// These properties are set to true to enable specific MongoDB driver 
// functionality.
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// The batchImport function inserts multiple items into the watches collection and 
// multiple companies into the companies collection
// If an error occurs during any of the database operations, the error 
// is logged to the console.
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("shop");

    await db.collection("watches").insertMany(items);
    await db.collection("companies").insertMany(companies);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};


batchImport();
