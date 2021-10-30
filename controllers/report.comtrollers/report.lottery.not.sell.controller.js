
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
const { log_lottery_out } = require('../CRUD.controllers/lottery_out.controller')
//report all in installment

let notsell = { brance_id: 0, installment: "", unit: "" }
exports.get_all_in_installment = (req, res) => {
    try {
        notsell = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`
        SELECT 
tbinstallment.installment,
tblottery.lottery_id,tblottery.lottery_name,
tblottery.lottery_printname,tblottery.lottery_refernumber,
tblottery.lottery_status,tbunit.unit,
tbbrance.brance_id,tbbrance.brance_name
FROM
tbinstallment inner join tbsell
on tbinstallment.installment_id =tbsell.installment_id
inner join tblottery on
tbsell.lottery_id = tblottery.lottery_id
inner join tbunit on
tblottery.unit_id = tbunit.unit_id
inner join tbbrance on
tbunit.brance_id = tbbrance.brance_id
inner join tbcompany on tbbrance.company_id = tbcompany.company_id
where tbbrance.brance_id = ? AND tbsell.sell_total=0 
AND tbinstallment.installment=?
        `, [notsell.brance_id, notsell.installment], (error, data) => {
            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }

            else {
                logger.info(data)
                return res.send({ data: data, message: "Success" })
            }
        })
    } catch (error) {
        logger.error(error)
        return res.send({ message: "Something wrong" })
    }
}
exports.get_in_installment_by_unit = (req, res) => {
    try {
        notsell = req.params
        logger.info("GET/")
        logger.info(req.params)
        dbcon.query(`CALL Lottery_Not_Sell(?,?,?)`,
            [notsell.brance_id, notsell.installment, notsell.unit], (error, data) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(data)
                    return res.send({ data: data, message: "Success" })
                }
            })
    } catch (error) {
        logger.error(error)
        return res.send({ message: "Something wrong" })
    }
}
exports.get_notsell_all = (req, res) => {
    try {
        notsell = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`
                     SELECT 
                           count(tblottery.lottery_id) count_of_lottery_notsell

                     FROM tbinstallment 
                         
                          INNER JOIN tbsell ON tbinstallment.installment_id =tbsell.installment_id
                          INNER JOIN tblottery ON tbsell.lottery_id = tblottery.lottery_id
                          INNER JOIN tbunit ON tblottery.unit_id = tbunit.unit_id
                          INNER JOIN tbbrance ON tbunit.brance_id = tbbrance.brance_id
                          INNER JOIN tbcompany ON tbbrance.company_id = tbcompany.company_id
                   
                          WHERE  tbbrance.brance_id = ? AND tbsell.sell_total=0     
        `, [notsell.brance_id], (error, data) => {
            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(data)
                return res.send({ data: data, message: "Success" })
            }
        })
    } catch (error) {
        logger.error(error)
        return res.send({ message: "Something wrong" })
    }
}
