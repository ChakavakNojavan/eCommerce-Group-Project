//Connecting to MongoDB with Node.js using dotenv and MongoClient
const { response } = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// These properties are set to true to enable specific MongoDB driver 
// functionality.
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// This function will updateStock upon checkout.  Using the destructured itemsArr from
// the request body we loop over the items to update the numInStock using the item _id and quantity.
// Each response from the updateOne method is pushed to the response array.
// The res status is set to 200 and the response array is sent as a JSON response.
// If there is an error, the res status is set to 500 and the response array is sent as a JSON response.
const updateStock = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("shop");
    const {itemsArr} = req.body
    try{
        await client.connect();
        
        let response = [];
        for(const item of itemsArr ){
            let res = await db.collection("watches").updateOne({ _id: item._id}, { $inc: {numInStock: -item.quantity}})
            response.push(res)
        }
        res.status(200).json(response);
        client.close();
    }
    catch(err){
        console.log(err)
        res.status(500).json(response);
    }
}
//we then export the function to be used elsewhere 
module.exports = { updateStock }