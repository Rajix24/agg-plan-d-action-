const express = require("express")

const router = express.Router()
const memberController = require("../controller/member.controller.js")

router.get('/', memberController.getAll)
router.get("/first_agg", memberController.first_agg)
router.get("/sec_agg", memberController.sec_agg)
router.get("/agg_tree", memberController.agg_tree)
router.get("/maintenance_agg", memberController.maintenance_agg)


module.exports = router


