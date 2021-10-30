
const dbcon = require('../../dbconfig/dbconfig')

const logger = require('../../config-log/logger')
const { data } = require('../../config-log/logger')

let Lottery = {
    lottery_id: "", lottery_name: "", lottery_printname: "",
    lottery_refernumber: "", lottery_status: "", unit_id: 0
}
//create lottery...
exports.createlottery = (req, res) => {

    try {
        Lottery = req.body
        logger.info('POST/lottery')
        logger.info(req.body)

        if (Lottery.lottery_id == "") {
            logger.warn('Enter your body')
            return res.status(400).send({ message: "Please provide a lottery_id..." })
        }
        //ກວດສອບວ່າເຄື່ອງຂາຍເລກເຄື່ອງນີ້ມີຢູ່ໃນລະບົບແລ້ວ ຫລື ຍັງ
        dbcon.query(`SELECT lottery_id FROM tblottery WHERE lottery_id =${Lottery.lottery_id}`, (error, data) => {

            if (!error) {
                if (data.affectedRows == 0 || data.length === 0) {
                    dbcon.query(`INSERT INTO tblottery VALUES (?,?,?,?,?,?,?)`,
                        [Lottery.lottery_id, Lottery.lottery_name, Lottery.lottery_printname,
                        Lottery.lottery_refernumber, Lottery.lottery_status, Lottery.unit_id, 0], (error, data) => {

                            if (error) {
                                logger.error(error)
                                res.status(403).send("Error")
                            }

                            else {
                                logger.info(data)
                                res.send({ data: data, message: "Success" })
                            }
                        })
                }
                else {
                    logger.warn('This lottery already have in system')
                    return res.status(403).send({ data: data, message: "ເຄື່ອງນີ້ມີຢູ່ລະບົບແລ້ວ. ກະລຸນາປ້ອນເຄື່ອງໃຫມ່!" })
                }

            }
            else {
                logger.error(error)
                return res.status(403).send("Error")
            }
        })

    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

//delete lottery....

exports.deletelottery = (req, res) => {

    try {
        Lottery = req.params

        logger.info('DELETE/lottery (PUT)')
        logger.info(req.params)

        if (Lottery.lottery_id == "") {
            logger.warn('No lottery id for delete')
            return res.status(400).send({ error: true, message: "Please provide lottery_id" })
        }

        dbcon.query(`UPDATE  tblottery set lottery_dlst = 0 where lottery_id = ?`,
            [Lottery.lottery_id],
            (error, results) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error");
                }
                else {
                    logger.info(results)
                    res.send({ error: true, data: results, message: "ສຳເລັບ" })
                }

            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

//update lottery

exports.updatelottery = (req, res) => {

    try {
        Lottery = req.body
        logger.info('PUT/lottery')
        logger.info(req.body)
        if (Lottery.lottery_id == "") {
            logger.warn('Enter your lottery body')
            return res.status(400).send({ error: true, message: "Please provide lottery_id" })
        }

        dbcon.query(`UPDATE tblottery  SET lottery_name=?,lottery_printname=?,
                lottery_refernumber=?,lottery_status=?,unit_id=? WHERE lottery_id=?`,
            [Lottery.lottery_name, Lottery.lottery_printname, Lottery.lottery_refernumber,
            Lottery.lottery_status, Lottery.unit_id, Lottery.lottery_id],
            (error, results) => {
                if (error) {
                    logger.error(error)
                    return res.status(403).send("Error");
                }
                else {
                    logger.info(results)
                    return res.send({ data: results, message: "ແກ້ໄຂສຳເລັບ" })
                }
            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

exports.get = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        logger.info('GET/lottery by brance id. ' + req.params.brance_id)
        dbcon.query(`
    SELECT tblottery.lottery_id,tblottery.lottery_name,tblottery.lottery_printname,
    tblottery.lottery_refernumber,tblottery.lottery_status,tblottery.seller_id,
    tbunit.unit
    from tblottery inner join tbunit on tblottery.unit_id = tbunit.unit_id
    inner join tbbrance on tbunit.brance_id = tbbrance.brance_id 
    inner join tbcompany on tbbrance.company_id = tbcompany.company_id
    where tblottery.lottery_dlst = 1 and tbbrance.brance_id =${brance_id}
    `, (error, data) => {
            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(results)
                res.send({ data: data, message: "Success" })
            }
        })
    } catch (error) {
        logger.error(error)
    }
}
