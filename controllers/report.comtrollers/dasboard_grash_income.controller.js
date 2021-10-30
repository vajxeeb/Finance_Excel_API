
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')

let income = { brance_id: 0, unit: "" }

exports.get_income_all = (req, res) => {

    income = req.params
logger.info('GET/dashboard. By brance id: '+ req.params.brance_id)
    try {
        dbcon.query(`CALL dashboard_income(${income.brance_id})`, (error, data) => {

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
        res.status(500).send("Something wrong")
    }
}
exports.get_income_unit = (req, res) => {

    try {
        income = req.params
        logger.info('GET/dashboard')
        logger.info(req.params)

        dbcon.query(`CALL dashboard_income(${income.brance_id})`,
            [income.brance_id, income.unit], (error, data) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }

                else {
                    logger.info(data)
                    res.send({ data: data, message: "Success" })
                }
            })
    } catch (error) {
        logger.error(error)
        res.status(500).send("Something wrong")
    }
}
