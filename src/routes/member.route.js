const express = require("express")

const router = express.Router()
const memberController = require("../controller/member.controller.js")

router.get('/', memberController.getAll)
router.get("/first_agg", memberController.first_agg)


module.exports = router


