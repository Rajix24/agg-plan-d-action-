const memberModel = require("../models/member.model")
const equimentModel = require("../models/equiment.model")
const loanModel = require("../models/loan.model")
const maintenanceModel = require("../models/maintenance.model")

class memberService{

    constructor(){
        this.member = memberModel;
        this.equiment = equimentModel;
        this.loan = loanModel;
        this.maintenance = maintenanceModel;
    }
    async get(){
        return await this.member.find()
    }

    async first_agg(){
        return await this.loan.aggregate([
            {
                $match:{
                    status:"RETURNED"
                },
            },
            {
                $group: {
                    _id: "$memberId",
                    returnedLoanCount: { $sum: 1 },
                    revenueCents: { $sum: "$feeCents" }
                }
            },
            {
                $sort:{
                    revenueCents: -1,
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    memberId: "$_id",
                    returnedLoanCount: 1,
                    revenueCents: 1
                }
            }
        ])
    }
}
module.exports = new memberService()
