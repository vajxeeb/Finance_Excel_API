
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')

let sell = { brance_id: 0, installment: "", unit: "" }

exports.get = (req, res) => {
    try {
        sell = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Lottery_Selling(?,?,?)`,
            [sell.brance_id, sell.installment, sell.unit], (error, data) => {

                if (error) {
                    logger.error(error)
                    res.status(401).send("Error")
                }
                else {
                    logger.info(data)
                    res.send({ data: data, message: "Success" })
                }
            })
    } catch (error) {
        logger.error(error)
        return res.send({ message: "Wrong" })
    }
}

exports.get_sell_all = (req, res) => {
    try {
        sell = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`
            SELECT 
                  count(tblottery.lottery_id) as count_of_lottery_sell
            FROM
                  tbinstallment 

                  INNER JOIN tbsell ON tbinstallment.installment_id = tbsell.installment_id
                  INNER JOIN tblottery ON tbsell.lottery_id = tblottery.lottery_id
                  INNER JOIN tbunit ON tblottery.unit_id = tbunit.unit_id
                  INNER JOIN tbbrance ON tbunit.brance_id = tbbrance.brance_id
                  INNER JOIN tbcompany ON tbbrance.company_id = tbcompany.company_id

            WHERE tbbrance.brance_id = ? AND tbsell.sell_total>0 
 `, [sell.brance_id], (error, data) => {

            if (error) {
                logger.error(error)
                res.status(401).send("Error")
            }
            else {
                logger.info(data)
                res.send({ data: data, message: "Success" })
            }
        })
    } catch (error) {
        logger.error(error)
        return res.send({ message: "Wrong" })
    }
}