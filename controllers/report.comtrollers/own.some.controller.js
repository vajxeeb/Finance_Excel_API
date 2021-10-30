
const dbcon = require('../../dbconfig/dbconfig')

const logger = require('../../config-log/logger')
//Get Not Pay All
let own = { brance_id: 0, unit: "", installment: "", date: "" }
exports.Own_Some_By_Date = (req, res) => {

    try {
        own = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_Some_By_Date(?,?)`,
            [own.brance_id, own.date], (error, data) => {
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
exports.Own_Some_By_Date_Installment = (req, res) => {
    try {

        own = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_Some_By_Date_Installment(?,?,?)`,
            [own.brance_id, own.date, own.installment], (error, data) => {
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
exports.Own_Some_By_Date_Unit = (req, res) => {

    try {

        own = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_Some_By_Date_Unit(?,?,?)`,
            [own.brance_id, own.date, own.unit], (error, data) => {
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


exports.Own_Some_By_Date_Unit_Installment = (req, res) => {

    try {
        own = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_Some_By_Date_Unit_Installment`,
            [own.brance_id, own.date, own.unit, own.installment], (error, data) => {

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

