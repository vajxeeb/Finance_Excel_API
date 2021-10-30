
const dbcon = require('../../dbconfig/dbconfig')

const logger = require('../../config-log/logger')

let own_all = { brance_id: 0, date: "", installment: "", unit: "" }
//Get Not Pay All
exports.Own_All_By_Date = (req, res) => {

    try {

        own_all = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_All_By_Date(?,?)`,
            [own_all.brance_id, own_all.date], (error, data) => {
                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                    // throw error
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
exports.Own_All_By_Date_Unit = (req, res) => {
    try {

        own_all = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_All_By_Date_Unit(?,?,?)`,
            [own_all.brance_id, own_all.date, own_all.unit], (error, data) => {
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
exports.Own_All_By_Date_Installment = (req, res) => {

    try {

        own_all = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_All_By_Date_Installment(?,?,?)`,
            [own_all.brance_id, own_all.date, own_all.installment], (error, data) => {
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

exports.Own_All_By_Date_Unit_Installment = (req, res) => {

    try {

        own_all = req.params
        logger.info('GET/')
        logger.info(req.params)
        dbcon.query(`CALL Own_All_By_Date_Unit_Installment(?,?,?,?)`,
            [own_all.brance_id, own_all.date, own_all.unit, own_all.installment], (error, data) => {
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
