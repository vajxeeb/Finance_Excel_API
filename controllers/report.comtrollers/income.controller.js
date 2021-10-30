
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')

let income = { brance_id: 0, date: "", installment: "", unit: "" }

exports.Income_By_Date = (req, res) => {

    try {
        income = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Sum_Income_By_Date(?,?)`,
            [income.brance_id, income.date], (error, data) => {
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
exports.Income_By_Date_Unit = (req, res) => {

    try {
        income = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Sum_Income_By_Date_Unit(?,?,?)`,
            [income.brance_id, income.date, income.unit], (error, data) => {
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
exports.Income_By_Date_Installment = (req, res) => {

    try {
        income = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Sum_Income_By_Date_Installment(?,?,?) `,
            [income.brance_id, income.date, income.installment], (error, data) => {
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
exports.Income_By_Date_Unit_Installment = (req, res) => {

    try {
        income = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`Sum_Income_By_Date_Unit_Installment(?,?,?,?) `,
            [income.brance_id, income.date, income.unit, income.installment], (error, data) => {
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
//get income details
exports.income_detail = (req, res) => {

    try {
        income = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Income_Detail (?,?,?)`,
            [income.brance_id, income.date, income.installment], (error, data) => {
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