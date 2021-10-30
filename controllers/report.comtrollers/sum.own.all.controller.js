
const dbcon = require('../../dbconfig/dbconfig')

const logger = require('../../config-log/logger')
const { log_lottery_out } = require('../CRUD.controllers/lottery_out.controller')
//Get Not Pay All
let sum = {brance_id: 0, data: "", installment: "", unit: ""}
exports.Sum_own_all_by_date = (req,res) =>{

    try{

        sum = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Sum_Own_All_By_Date(?,?)`,
              [sum.brance_id,sum.date],(error,data)=>{
            if(error) {
                logger.error(error)
                res.status(403).send("Error")
            }

           else{
               logger.info(data)
               res.send({data:data,message:"Success"})
           } 
        })
    }catch(error)
    {
        logger.error(error)
        res.status(500).send("Something wrong")
    }
}
exports.Sum_own_all_by_date_unit = (req,res) =>{
    try{

        sum = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Sum_Own_All_By_Date_Unit(?,?,?)`,
             [sum.brance_id, sum.date, sum.unit],(error,data)=>{
            if(error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else{
                logger.info(data)
res.send({data:data,message:"Success"})
            }
            
        })
    }catch(error)
    {
        logger.error(error)
       return res.status(500).send("Something wrong")
    }
}
exports.Sum_own_all_by_date_installment = (req,res) =>{

    try{

        sum = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Sum_Own_All_By_Date_Installment`,
              [sum.brance_id, sum.date, sum.installment],(error,data)=>{
        if(error) 
        {
            logger.error(error)
            res.status(403).send("Error")
        }

           else {
               logger.info(data)
               res.send({data:data,message:"Success"})
           }
        })
    }catch(error)
    {
        logger.error(error)
       return  res.status(500).send("Something wrong")
    }
}

exports.Sum_own_all_by_date_unit_installment = (req,res) =>{

    try{

        sum = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Sum_Own_All_By_Date_Unit_Installment(?,?,?,?)`,
              [sum.brance_id, sum.date, sum.unit, sum.installment],(error,data)=>{
            if(error) {
                logger.error(error)
                res.status(403).send("Error")
            }

           else 
           {
               logger.info(data)
               res.send({data:data,message:"Success"})
           }
        })
    }catch(error)
    {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

