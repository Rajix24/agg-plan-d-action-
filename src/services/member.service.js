const memberModel = require("../models/member.model")
const loanModel = require("../models/loan.model")
const maintenanceModel = require("../models/maintenance.model")

class memberService{

    constructor(){
        this.member = memberModel;
        this.loan = loanModel;
        this.maintenance = maintenanceModel;
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

    async maintenance_agg(){
        return await this.maintenance.aggregate([
            { $match: { status: "DONE" } },
            {
                $lookup: {
                    from: "equipments",
                    localField: "equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            // Removes interventions with no matching equipment (no usable category).
            { $unwind: "$equipment" },
            { $match: { "equipment.archived": { $ne: true } } },
            {
                $group: {
                    _id: "$equipment.category",
                    interventionCount: { $sum: 1 },
                    totalCostCents: { $sum: "$costCents" },
                    averageCostCents: { $avg: "$costCents" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    interventionCount: 1,
                    averageCostCents: { $round: ["$averageCostCents", 2] },
                    totalCostCents: 1
                }
            },
            { $sort: { totalCostCents: -1 } }
        ])
    }

    async monthly_agg(){
        return await this.loan.aggregate([
            {
                $match: {
                    status: "RETURNED",
                    returnedAt: {
                        $gte: new Date("2026-03-01T00:00:00.000Z"),
                        $lt: new Date("2026-05-01T00:00:00.000Z")
                    }
                }
            },
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
                $addFields: {
                    period: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$returnedAt",
                            timezone: "UTC"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        period: "$period",
                        category: "$equipment.category"
                    },
                    loanCount: { $sum: 1 },
                    revenueCents: { $sum: "$feeCents" }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: "$_id.period",
                    category: "$_id.category",
                    loanCount: 1,
                    revenueCents: 1
                }
            },
            { $sort: { period: 1, revenueCents: -1, category: 1 } }
        ])
    }
}
module.exports = new memberService()
