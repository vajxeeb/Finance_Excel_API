
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
const { data } = require('../../config-log/logger')

let seller = {
    seller_id: 0, seller_name: "", seller_age: "", seller_job: "", seller_phone: "",
    seller_address: "", type_of_persent_id: 0
}
let sql = ""

exports.createseller = (req, res) => {
    try {

        seller = req.body

        logger.info('POST/Register')
        logger.info(req.body)

        const lottery_id = req.params.lottery_id

        logger.info('lottery id is: ' + req.params.lottery_id)

        if (seller.seller_name == "" || seller.seller_phone == "" || seller.type_of_persent == 0) {
            logger.warn('The body connot empty')
            return res.status(400).send({ message: "Please check a seller info" })
        }

        sql = `INSERT INTO tbseller (seller_name, seller_age, seller_job, seller_phone, 
                                    seller_address, type_of_persent_id) VALUES (?,?,?,?,?,?)`

        dbcon.query(sql, [seller.seller_name, seller.seller_age, seller.seller_job, seller.seller_phone,
        seller.seller_address, seller.type_of_persent_id], (error, data) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                sql = `UPDATE tblottery SET seller_id = ${data.insertId}, lottery_status= 'ໃຊ້ງານ' WHERE lottery_id = ${lottery_id}`
                dbcon.query(sql, (error, data) => {

                    if (error) {
                        logger.error(error)
                        res.status(403).send("Error")
                    }
                })
                logger.info(data)
                return res.send(data)
            }
        })


    }
    catch (error) {
        logger.error(error)
        res.status(500).send(error)
    }

}
//update seller or register  for seller
exports.update = (req, res) => {
    try {

        seller = req.body
        logger.info('PUT/seller')
        logger.info(req.body)
        if (seller.seller_name == "" || seller.seller_phone == "" || seller.type_of_persent_id == 0) {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please check a seller info" })
        }
        sql = `update tbseller SET seller_name=?,seller_age=?,seller_job=?,
       seller_phone=?,seller_address=?, type_of_persent_id =? where seller_id =?`
        dbcon.query(sql, [seller.seller_name, seller.seller_age,
        seller.seller_job, seller.seller_phone, seller.seller_address,
        seller.type_of_persent_id, seller.seller_id], (error, data) => {

            if (!error) {
                logger.info(data)
                res.send(data)
            }

            else {
                logger.error(error)
                res.status(403).send("Error")

            }
        })
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send(error);

    }

}
//delete seller or register info 

exports.deleteseller = (req, res) => {

    try {
        seller = req.params
        logger.info('DELETE/seller (PUT). By seller id: ' + req.params.seller_id)
        if (seller.seller_id == 0) {
            logger.warn('No seller id for DELETE')
            return res.status(400).send({ message: "Please provide a seller_id" })
        }
        sql = `UPDATE tbseller SET seller_dlst = 0 WHERE seller_id= ?`
        dbcon.query(sql, [seller.seller_id], (error, result) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }

            else {
                logger.info(result)
                res.send({ data: result, message: "Seller have deleted" })
            }
        })

    }
    catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")

    }
}
exports.get = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        logger.info('GET/seller. By brance id: ' + req.params.brance_id)

        dbcon.query(`CALL Get_Seller(${brance_id})`, (error, data) => {
            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(data)
                return res.send({ data: data, message: "Success" })
            }
        })

    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }

}
