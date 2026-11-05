const express = require("express")
const app = express()
const memberRouter = require("./routes/member.route")
app.use(express.json())



app.get("/", (req, res)=>{
    res.status(200).json({
        message: "application in running..."
    })
})

app.use("/member", memberRouter)

module.exports= app