
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
//get all sell from num6

exports.get = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`
            SELECT 
                    tbinstallment.installment,tbsell.sell_n6,tbwin.win_nout,tbsell.sell_date,tblottery.lottery_id,tblottery.seller_id
             
            FROM tbinstallment 

                  INNER JOIN tbsell ON tbinstallment.installment_id =tbsell.installment_id
                  INNER JOIN tbwin ON tbinstallment.installment_id= tbwin.installment_id
                  INNER JOIN  tblottery ON tbwin.lottery_id = tblottery.lottery_id
                  INNER JOIN  tbunit ON tblottery.unit_id = tbunit.unit_id
                  INNER JOIN  tbbrance ON tbunit.brance_id = tbbrance.brance_id
                  INNER JOIN  tbcompany ON tbbrance.company_id = tbcompany.company_id

            WHERE tbbrance.brance_id = ?`, [brance_id], (error, data) => {

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
        return res.status(500).send({ message: "Something wrong" })
    }
}