const memberService =  require("../services/member.service.js")

 class memberController{
        constructor(){
            this.memberService = memberService
        }
        getAll = async (req, res) => {
            try{
                const data = await this.memberService.get()
                res.status(200).json({
                    message: "operation in done", 
                    data: data
                })
            }catch(err){
                console.log(err)
                res.status(500).json({
                    message: "error in application", 
                    error: err.message
                })
            }
        }   
}

module.exports = new memberController()