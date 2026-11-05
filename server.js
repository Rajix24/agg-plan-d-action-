const app = require("./src/app.js")

const connection_db = require("./src/config/db.js")

require('dotenv').config()

const port = process.env.PORT || 3000


async function startApplication(){
    try{
    await connection_db()
    app.listen(port, ()=>{
        console.log(`server is running on port ${port}..... `)
    })
    }catch(err){
        console.error(err)
        process.exitCode = 1
    }
}
startApplication()
