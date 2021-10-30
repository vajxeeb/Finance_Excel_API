
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger');
//create brance
let brance = { brance_id: 0, brance_name: "", brance_address: "", company_id: 0 }
let sql = ""

exports.createbrance = (req, res) => {

    try {

        brance = req.body;

        logger.info("POST/brance")
        logger.info(req.body)
       
        if (brance.brance_name == "" || brance.brance_address == "" || brance.company_id == 0) {
 
            logger.warn('Some body empty')
            return res.status(400).send({ message: "Enter brance info" })
        }
        sql = `INSERT INTO tbbrance (brance_name,brance_address,company_id) VALUES (?,?,?)`
        dbcon.query(sql, [brance.brance_name, brance.brance_address, brance.company_id], (error, result) => {

            if (error) {
                logger.error("ERR: "+error)
                res.status(403).send({ message: "Error" })
            }
            else {              
                logger.info(result)
                res.send(result)
            }
        });

        
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

//get brance

exports.getbrance = (req, res) => {

    try {

        brance = req.params
        logger.info("GET/brance")
        logger.info(req.params)

        dbcon.query(`SELECT tbbrance.brance_id,tbbrance.brance_name,
        tbbrance.brance_address,tbcompany.company_name FROM tbbrance 
        INNER JOIN tbcompany ON tbbrance.company_id = tbcompany.company_id
         where brance_dlst = 1 and  tbcompany.company_id=${brance.company_id}`,
            (error, result) => {
                if (error) {
                    logger.error("ERR: "+error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(result)
                    res.send(result)
                }

            })

    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }

}

//update brance
exports.updatebrance = (req, res) => {

    try {
        brance = req.body;
        logger.info("PUT/brance")
        logger.info(req.body)
        if (brance.brance_id == 0 || brance.brance_name == "" || brance.brance_address == "" || brance.company_id == 0) {
            logger.warn("Some body empty")
            return res.status(400).send({ message: "Enter brance info" })
        }
        dbcon.query(`UPDATE tbbrance SET brance_name=?,
                  brance_address=? where brance_id = ?`
            , [brance.brance_name, brance.brance_address, brance.brance_id], (error, result) => {

                if (error) {
                    logger.error("ERR: "+error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(result)
                    res.send({ data: result, message: "Brance have updated" })
                }

            });
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

//delete brance

exports.detelebrance = (req, res) => {

    try {
        brance = req.params
        logger.info("DELETE/brance (PUT)")
        logger.info(req.params)
        if (brance.brance_id == 0) {

            logger.warn("No brance id from where cause")
            return res.send(400).send({ error: false, message: "Please provide brance_id." })
        }

        dbcon.query(`Update  tbbrance set brance_dlst = 0 WHERE brance_id = ?`, [brance.brance_id], (error, result) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(result)
                res.send(result)
            }

        })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}