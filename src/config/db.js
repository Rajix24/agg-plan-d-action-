const mongo = require("mongoose")
require("dotenv").config()
const db_url = process.env.MONGO_URL 



function connection_db(){
    try{
        mongo.connect(db_url).then(()=>{
            console.log("database are connected...... ")
        })
    }catch(err){
        console.log(err)
        throw new Error("database connection faile....")
    }
}


module.exports = connection_db