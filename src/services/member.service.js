const memberModel = require("../models/member.model")
const loanModel = require("../models/loan.model")

class memberService{

    constructor(){
        this.member = memberModel;
        this.loan = loanModel;
    }
    async get(){
        return await this.member.find()
    }

    async first_agg(){
        return await this.loan.aggregate([
            { $match: { status: "RETURNED" } },
            {
                $group: {
                    _id: "$memberId",
                    returnedLoanCount: { $sum: 1 },
                    revenueCents: { $sum: "$feeCents" }
                }
            },
            { $sort: { revenueCents: -1, _id: 1 } },
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

    async sec_agg(){
        return await this.loan.aggregate([
            { $match: { status: "RETURNED" } },
            {
                $lookup: {
                    from: "equipments",
                    localField: "equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            { $unwind: "$equipment" },
            { $match: { "equipment.archived": { $ne: true } } },
            {
                $group: {
                    _id: "$equipment.category",
                    loanCount: { $sum: 1 },
                    averageDurationDays: { $avg: "$durationDays" },
                    revenueCents: { $sum: "$feeCents" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    loanCount: 1,
                    averageDurationDays: { $round: ["$averageDurationDays", 2] },
                    revenueCents: 1
                }
            },
            { $sort: { revenueCents: -1, category: 1 } }
        ])
    }

    async agg_tree(){
        return await this.loan.aggregate([
            { $match: { status: "RETURNED" } },
            {
                $lookup: {
                    from: "equipments",
                    localField: "equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            { $unwind: "$equipment" },
            { $match: { "equipment.archived": { $ne: true } } },
            {
                $lookup: {
                    from: "members",
                    localField: "memberId",
                    foreignField: "_id",
                    as: "member"
                }
            },
            { $unwind: "$member" },
            { $match: { "member.active": true } },
            {
                $group: {
                    _id: "$member.city",
                    loanCount: { $sum: 1 },
                    revenueCents: { $sum: "$feeCents" }
                }
            },
            {
                $project: {
                    _id: 0,
                    city: "$_id",
                    loanCount: 1,
                    revenueCents: 1
                }
            },
            { $sort: { revenueCents: -1, city: 1 } }
        ])
    }
}
module.exports = new memberService()
