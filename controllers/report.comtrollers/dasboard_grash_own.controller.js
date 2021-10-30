const logger = require('../../config-log/logger')
const dbcon = require('../../dbconfig/dbconfig')

let own = {brance_id: 0, unit: ""}

exports.get_own_all = (req,res) =>{

    try{
        own = req.params
logger.info('GET/')
logger.info(req.params)
        dbcon.query(`CALL Dashboard_own(?)`,[own.brance_id],(error,data)=>{
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
        res.status(500).send("Something wrong")
    }
}
// exports.get_own_unit = (req,res) =>{

//     try{
//       own = req.params

// const sql =`select 

// sum(tbsell.sell_total-(tbsell.sell_total * tbsell.sell_persent)/100) as own_all

// from tbinstallment inner join tbsell
// on tbinstallment.installment_id = tbsell.installment_id
// inner join tblottery on tblottery.lottery_id = tbsell.lottery_id
// inner join tbunit inner join tbseller on
//  tbunit.unit_id = tblottery.unit_id
//  and tblottery.seller_id = tbseller.seller_id
// inner join tbbrance on tbunit.brance_id = tbbrance.brance_id
// inner join tbcompany on tbbrance.company_id = tbcompany.company_id
// where tbinstallment.installment_id not in
// (select installment_id from tbthork where installment_id = tbinstallment.installment_id and
// lottery_id= tblottery.lottery_id) and tbbrance.brance_id = ? 
// and tbunit.unit=? and installment = ?`
//         dbcon.query(sql,[brance_id,unit,installment],(error,data)=>{
//             if(error) {
//                 logger.error(error)
//                 res.status(403).send("Error")
//             }

//            else res.send({data:data,message:"Success"})
//         })
//     }catch(error)
//     {
//         logger.error(error)
//         res.status(500).send("Something wrong")
//     }
// }
