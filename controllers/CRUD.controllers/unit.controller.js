
const dbcon = require('../../dbconfig/dbconfig')


const logger = require('../../config-log/logger')
const { data } = require('../../config-log/logger')

let unit = {unit_id: 0, brance_id: 0, unit: "", unit_own: ""}

//create unit
exports.create = (req, res) => {

    try {

       unit = req.body
       logger.info('POST/unit')
       logger.info(req.body)
        if (unit.brance_id==0 || unit.unit== "" || unit.unit_own == "") {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please provide unit info" })
        }

        dbcon.query(`insert into tbunit(brance_id,unit,unit_own)
        values (?,?,?)`, [unit.brance_id, unit.unit, unit.unit_own], (error, result) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else{
                logger.info(result)
                return res.send({ data: result, message: "Created" })
            }
            
        })

    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}


//update unit

exports.update = (req, res) => {
    try {

       unit = req.body
logger.info('PUT/unit')
logger.info(req.body)
        if (unit.brance_id== 0 || unit.unit == 0|| unit.unit_own ==0  || unit.unit_id == 0) {
           logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please provide unit info" })
        }
        dbcon.query(`update tbunit set brance_id=?,unit=?,unit_own=? where unit_id=?`,
            [unit.brance_id, unit.unit, unit.unit_own, unit.unit_id], (error, result) => {

                if (!error) 
                {
                    logger.info(result)
                    return res.send({ data: result, message: "Updated" })
                }
                else {
                    logger.error(error)
                    res.status(403).send("Error")
                } 
            })

    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }

}

exports.delete = (req, res) => {

    try {
       unit = req.params
logger.info('DELETE/unit (PUT)')
logger.info(req.params)
        if (unit.unit_id == 0) {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please provide unit_id" })
        }
        dbcon.query(`update  tbunit set unit_dlst = 0 where unit_id =?`, [unit.unit_id], (error, result) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else{
logger.info(result)
            return res.send({ data: result, message: "ສຳເລັບ" })}
            
        })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}
//get
exports.get = (req, res) => {

    try {
        unit = req.params
        logger.info('GET/unit. By brance id: '+ req.params.brance_id)

        dbcon.query(`select tbunit.unit_id,tbunit.unit,tbunit.unit_own from
        tbunit inner join tbbrance on tbunit.brance_id = tbbrance.brance_id 
        inner join tbcompany on tbbrance.company_id = tbcompany.company_id
        where tbbrance.brance_id =? and tbunit.unit_dlst = 1`, [unit.brance_id], (error, result) => {

            if (error){
                logger.error(error)
                res.status(403).send("Error")
            } 
            else{
                logger.info(result)
                return res.send({ data: result, message: "SUccess" })
            }
            
        })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}


