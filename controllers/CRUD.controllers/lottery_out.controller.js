
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
//log lottery out

exports.log_lottery_out = (req, res) => {

    try {
         const lottery_id = req.params.lottery_id
         logger.info('PUT/lottery out by lottery id: '+ req.params )

        if (!lottery_id) {
            logger.warn('No lottery id for logout')
            return res.status(400).send({ message: "Please provide lottery_id." })
        }
        dbcon.query(`Update tblottery Set lottery_status ='ວ່າງ',seller_id = 0 Where lottery_id = ? `, [lottery_id], (error, results) => {

            if (!error) {
                logger.info(results)
                res.send({ data: results, message: "logouted" })
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