
const dbcon = require('../../dbconfig/dbconfig')

const logger = require('../../config-log/logger')


let persent = { persent_id: 0, persent: 0, type_of_persent_id: 0, brance_id: 0 }
//get persent 
exports.getallpersent = (req, res) => {
    try {

        persent = req.params

        logger.info('GET/persent. By brance id: ' + req.params.brance_id)
        dbcon.query(`

        SELECT tbpersent.persent_id,tbpersent.persent,tbtype_of_persent.type_of_persent
        FROM   tbpersent 
        INNER JOIN tbpersent_detail 
        INNER JOIN tbtype_of_persent ON
                   tbpersent.type_of_persent_id = tbtype_of_persent.type_of_persent_id
        AND tbpersent.persent_id = tbpersent_detail.persent_id
        INNER join tbbrance on tbpersent_detail.brance_id = tbbrance.brance_id
        WHERE tbbrance.brance_id = ${persent.brance_id} `, (error, result) => {
            if (!error) {
                logger.info(result)
                return res.send(result)
            }

            else
                logger.error(error)
        })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}
//Update a persent
exports.update = (req, res) => {
    try {

        persent = req.body

        logger.info('PUT/persent')
        logger.info(req.body)

        if (persent.persent == 0) {

            logger.warn('Body connot empty')
            return res.status(400).send({ message: "Enter persent" })
        }

        dbcon.query(`update tbpersent SET type_of_persent_id=?, persent =? where persent_id=?`,
            [persent.type_of_persent_id, persent.persent, persent.persent_id], (error, result) => {
                if (!error) {
                    logger.info(result)
                    res.send(result)
                }
                else
                    logger.error(error)
            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

exports.create = (req, res) => {
    try {
        persent = req.body
        logger.info('POST/persent')
        logger.info(req.body)
        if (persent.type_of_persent_id == 0 || persent.persent == 0 || persent.brance_id == 0) {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Enter persent or choose a type of persent" })
        }

        dbcon.query(`insert into tbpersent (type_of_persent_id,persent) values (?,?)`,
            [persent.type_of_persent_id, persent.persent], (error, data) => {

                if (error) {
                    logger.error(error)
                    res.send("Error")
                }
                else {
                    dbcon.query(`insert into tbpersent_detail (persent_id,brance_id) values (?,?)`,
                        [data.insertId, persent.brance_id], (error, data) => {

                            if (error) {
                                logger.error(error)
                                res.status(403).send("Error")
                            }
                        })
                    logger.info(data)
                    res.send({ data: data })
                }
            })
    } catch (error) {
        logger.error(error)
    }
}