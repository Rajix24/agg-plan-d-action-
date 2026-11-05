const mongo = require("mongoose")
require("dotenv").config()
const db_url = process.env.MONGO_URL 



async function connection_db(){
    if (!db_url) {
        throw new Error("MONGO_URL is not configured");
    }

    await mongo.connect(db_url);
    console.log(`database connected: ${mongo.connection.name}`);
}


module.exports = connection_db
