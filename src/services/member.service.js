const memberModel = require("../models/member.model")

class memberService{

    constructor(){
        this.member = memberModel;
    }
    async get(){
        return await this.member.find()
    }
}
module.exports = new memberService()