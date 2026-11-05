const app = require("./src/app.js")

const connection_db = require("./src/config/db.js")

require('dotenv').config()

const port = process.env.PORT || 3000


mongo_url = process.env.MONGO_URL



async function startApplication(){
    try{
    connection_db()
    app.listen(port, ()=>{
        console.log(`server is running on port ${port}..... `)
    })
    }catch(err){
        console.log(err)
    }
}
startApplication()
