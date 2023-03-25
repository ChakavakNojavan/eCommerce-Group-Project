const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const updateStock = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("shop");
    const {itemsArr} = req.body
    try{
        await client.connect();
        
        let response = [];
        for(const item of itemsArr ){
            console.log(item._id)
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

module.exports = { updateStock }