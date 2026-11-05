const express = require("express")

const router = express.Router()
const memberController = require("../controller/member.controller.js")

router.get('/', memberController.getAll)



module.exports = router


