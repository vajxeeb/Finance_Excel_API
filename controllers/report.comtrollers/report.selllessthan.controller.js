
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
//get all lottery that get less than 150000

let selless = { brance_id: 0, installment: "", unit: "" }
exports.get_all_in_installment = (req, res) => {

    try {
        selless = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`
                    SELECT 
                           tbinstallment.installment,tbsell.sell_total,tbwin.win_total,tbwin.win_nout,tblottery.lottery_id,tblottery.seller_id
                    FROM   tbinstallment 
                           INNER JOIN tbsell ON tbinstallment.installment_id = tbsell.installment_id
                           INNER JOIN  tbwin ON tbinstallment.installment_id = tbwin.installment_id
                           INNER JOIN  tblottery on tbwin.lottery_id = tblottery.lottery_id  
                           INNER JOIN  tbunit ON tblottery.unit_id =tbunit.unit_id  
                           INNER JOIN  tbbrance ON tbunit.brance_id = tbbrance.brance_id 
                           INNER JOIN tbcompany ON tbbrance.company_id = tbcompany.company_id
                    WHERE sell_total>150000 AND tbbrance.brance_id = ? AND tbinstallment.installment = ? `,
            [selless.brance_id, selless.installment], (error, data) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }

                else 
                {
                    logger.info(data)
                    return res.send({ data: data, message: "Success" })
                }
            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//get sell less than 150000 in installment by unit
exports.get_all_in_installment_by_unit = (req, res) => {

    try {
        selless = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`
     SELECT 
            tbinstallment.installment,tbsell.sell_total,tbwin.win_total,tbwin.win_nout,tblottery.lottery_id,tblottery.seller_id
     FROM   tbinstallment 
            INNER JOIN tbsell ON tbinstallment.installment_id = tbsell.installment_id
            INNER JOIN  tbwin ON tbinstallment.installment_id = tbwin.installment_id
            INNER JOIN  tblottery on tbwin.lottery_id = tblottery.lottery_id  
            INNER JOIN  tbunit ON tblottery.unit_id =tbunit.unit_id  
            INNER JOIN  tbbrance ON tbunit.brance_id = tbbrance.brance_id 
            INNER JOIN tbcompany ON tbbrance.company_id = tbcompany.company_id

     WHERE sell_total>150000 AND tbbrance.brance_id = ? AND tbinstallment.installment = ? AND tbunit.unit=? `


            , [selless.brance_id, selless.installment, unit], (error, data) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }

                else 
                {
                    logger.info(data)
                    res.send({ data: data, message: "Success" })
                }
            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}