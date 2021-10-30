const dbcon = require('../../dbconfig/dbconfig')

const logger = require('../../config-log/logger')
//show report lottery free

let free = { brance_id: 0, unit: "" }
exports.reportall = (req, res) => {

    try {

        free = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Lottery_Free_All(${free.brance_id})`, (error, data) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }

            else {
                logger.info(data)
                return res.send({ data: data, message: "Sucess" })
            }
        })
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//show report lottery free

exports.report_by_unit = (req, res) => {

    try {
        free = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Lottery_Free_All_By_Unit(?,?)`, [free.brance_id, free.unit], (error, data) => {
            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(data)
                return res.send({ data: data, message: "Sucess" })
            }
        })
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

exports.get_free_all = (req, res) => {

    try {
        free = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`SELECT 
                            count(tblottery.lottery_id) count_of_lottery_free
                     FROM   tblottery  
                             INNER JOIN tbunit ON tblottery.unit_id=tbunit.unit_id 
                             INNER JOIN tbbrance ON tbunit.brance_id = tbbrance.brance_id 
                             INNER JOIN tbcompany ON tbbrance.company_id = tbcompany.company_id
                    
                     WHERE   tblottery.seller_id = 0 AND tbbrance.brance_id =? `,
            [free.brance_id], (error, data) => {
                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(data)
                    return res.send({ data: data, message: "Sucess" })
                }

            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}
