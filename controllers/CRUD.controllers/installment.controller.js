
const dbcon = require('../../dbconfig/dbconfig')

const logger = require('../../config-log/logger')


exports.getinstallment = (req, res) => {

    try {
        const brance_id = req.params.brance_id
        logger.info('GET/installment by brance id'+ req.params.brance_id)

        dbcon.query(`SELECT tbinstallment.installment_id,tbinstallment.installment from 
        tbinstallment inner join tbsell on tbinstallment.installment_id = tbsell.installment_id
        inner join tblottery on tbsell.lottery_id = tblottery.lottery_id
        inner join tbunit on tblottery.unit_id = tbunit.unit_id
        inner join tbbrance on tbunit.brance_id = tbbrance.brance_id
        inner join tbcompany on tbbrance.company_id = tbcompany.company_id
        where tbbrance.brance_id=${brance_id}`, (error, result) => {
            if (!error) {
                logger.info(result)
                 res.send({data:result,message:"ສຳເລັບ"})
            }
            else  {
                logger.error(error)
                res.status(403).send("Error")
            }
        })
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

