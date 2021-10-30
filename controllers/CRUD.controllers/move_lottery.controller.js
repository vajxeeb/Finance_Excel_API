const dbCon = require("../../dbconfig/dbconfig");

const logger = require('../../config-log/logger')
//move lottery
exports.move_lottery = (req, res) => {


    const { lottery_id, unit_id } = req.body
    logger.info('PUT/move_lottery')
    logger.info(req.body)

    if (!lottery_id || !unit_id) {
        logger.warn('Body cannot empty')
        return res.status(400).send({ error: true, message: "Please provide lottery_id or unit_id." })
    }

    try {
        dbCon.query(`Update tblottery SET unit_id = ? WHERE lottery_id=?`, [unit_id, lottery_id], (error, results) => {

            
        if(!error) {
            logger.info(results)
            res.send({data: results, message: "Moved." })
        }
        else {
            logger.error(error)
            res.status(403).send("Error")
        } 
        })
    } catch (error) {
        logger.error(error)
      return res.status(500).send("Something")        
    }
}