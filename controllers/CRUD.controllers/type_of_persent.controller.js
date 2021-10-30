

const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')

exports.create = (req, res) => {
    try {
        const { type_of_persent, type_of_persent_value } = req.body
        logger.info('POST/type_of_persent')
        logger.info(req.body)
        if (!type_of_persent) {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Enter your type of persent" })
        }


        dbcon.query(`insert into tbtype_of_persent (type_of_persent, type_of_persent_value) values (?,?)`,
            [type_of_persent, type_of_persent_value], (err, data) => {

                if (err) {
                    logger.error(err)
                    return res.status(403).send("Error")
                }
                else {
                    logger.info(data)
                    res.send({ data: data, message: "Type of persent was created success" })
                }
            })
    } catch (error) {
        logger.error(error)
    }
}
exports.get = (req, res) => {

    try {
        dbcon.query(`select * from tbtype_of_persent`, (err, data) => {

            if (err) {
                logger.error(err)
                return res.status(403).send("Error")
            }
            else {
                logger.info(data)
                res.send(data)
            }
        })
    } catch (error) {
        logger.error(error)
    }
}