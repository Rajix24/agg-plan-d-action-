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

        first_agg = async (req, res)=>{
            try{
                const data = await this.memberService.first_agg()
                res.status(200).json({
                    message: "operation in done", 
                    data: data
                })
            }catch(error){
                console.error(error)
                res.status(500).json({
                    message: "error in application", 
                    error: error.message
                })
            }
        }
}

module.exports = new memberController()
