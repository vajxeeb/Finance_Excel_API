
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
const e = require('cors')
//create thork
let thork = {
    lottery_id: "", installment_id: 0, user_id: 0,
    thork_date: "", thork_by_transfer: 0, thork_by_cash: 0
}

exports.create_by_one = (req, res) => {

    try {
        thork = req.body
        logger.info('POST/thork')
        logger.info(req.body)

        if (thork.lottery_id == "" || thork.installment_id == 0 || thork.user_id == 0 || thork.thork_date == "") {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please check data" })
        }
        dbcon.query(`select lottery_id, installment_id from tbthork where lottery_id=?
                      and installment_id=?`, [thork.lottery_id, thork.installment_id], (error, data) => {

            if (error) {
                logger.error(error)
                res.send("Error")
            }
            if (data === undefined || data.length == 0) {
                dbcon.query(`INSERT INTO tbthork (lottery_id,installment_id,user_id,thork_date,
            thork_by_transfer,thork_by_cash) VALUES(?,?,?,?,?,?)`,
                    [thork.lottery_id, thork.installment_id, thork.user_id, thork.thork_date, thork.thork_by_transfer, thork.thork_by_cash], (error, result) => {

                        if (error) {
                            logger.error(error)
                            res.status(403).send("Error")
                        }

                        else {
                            logger.info(result)
                            return res.send({ data: result, message: "Thork have created" })
                        }

                    })
            }
            else {
                logger.warn(data)
                res.send({ data: data, message: "This lottery in this installment already thork" })
            }
        })

    } catch (error) {
        logger.error(error)
        return res.status(500).send(error)
    }
}
//create thork


//update 
exports.update_by_one = (req, res) => {

    try {
        thork = req.body
        thork = req.params

        logger.info('PUT/thork')
        logger.info(req.body)
        logger.info(req.params)

        if (thork.lottery_id || thork.installment_id) {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please check data" })
        }
        dbcon.query(`select thork_by_transfer as f,thork_by_cash as c from tbthork
         where lottery_id=? and installment_id=?`, [thork.lottery_id, thork.installment_id], (error, data) => {

            if (error) {
                logger.error(error)
                return res.status(403).send("Error")
            }
            else {
                logger.info(data)
                const data1 = data[0]
                const transfer = data1.f
                const cash = data1.c

            }

            dbcon.query(`Update tbthork SET thork_by_transfer=${transfer + thork.thork_by_transfer},
            thork_by_cash=${cash + thork.thork_by_cash} WHERE lottery_id =?
            and installment_id =?`,
                [thork.lottery_id, thork.installment_id], (error, result) => {

                    if (error) {
                        logger.error(error)
                        return res.status(403).send("Error")
                    }

                    else {
                        logger.info(result)
                        return res.send({ data: result, message: "updated" })
                    }

                })
        })


    } catch (error) {
        logger.error(error)
        return res.status(500).send(error)
    }
}

//delete
exports.delete = (req, res) => {
    try {
        thork = req.params
        logger.info('DELETE/thork')
        logger.info(req.params)
        if (thork.thork_id) {
            logger.warn('No id for delete')
            return res.status(400).send({ message: "Please provide id" })
        }

        dbcon.query(`Delete from tbthork where thork_id =?`, [thork.thork_id], (error, result) => {
            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }


            else {
                logger.info(result)
                return res.send({ data: result, message: "Sucess" })
            }

        })
    } catch (error) {
        logger.error(error)
        return res.send(error)
    }
}
let brance_id = 0
//get thork
exports.get = (req, res) => {
    try {
        brance_id = req.params
        logger.info('GET/thork. By ' + req.params.brance_id)

        dbcon.query(`
select
tblottery.lottery_id,tbseller.seller_name,
tbsell.sell_total,(tbsell.sell_total * tbsell.sell_persent)/100 as persent,
tbsell.sell_total-(tbsell.sell_total * tbsell.sell_persent)/100 as real_thork,
tbthork.thork_by_transfer,
tbthork.thork_by_cash,
(tbthork.thork_by_transfer+tbthork.thork_by_cash) as thork_total,
tbthork.thork_date,
tbthork.thork_id,tbinstallment.installment
from
tbinstallment inner join tbsell 
on tbinstallment.installment_id
=tbsell.installment_id
inner join tblottery
on tbsell.lottery_id = tblottery.lottery_id
inner join tbthork  inner join tbunit
inner join tbseller
on tblottery.lottery_id=tbthork.lottery_id
and tblottery.unit_id = tbunit.unit_id
and tblottery.seller_id = tbseller.seller_id
inner join tbbrance on
tbunit.brance_id = tbbrance.brance_id
WHERE tbbrance.brance_id = ?
`, [brance_id], (error, data) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(data)
                return res.send({ data: data, message: "Sucess" })
            }

        })
    } catch (error) {
        logger.error(error)
        return res.send("Something wrong")
    }
}

exports.get_info_for_thork = (req, res) => {
    try {
        brance_id = req.params
        thork = req.params
        logger.info('GET/info_for_thork')
        logger.info(req.params)
        dbcon.query(`
        select 
        tbinstallment.installment,tblottery.lottery_id, tbsell.sell_total,tbsell.sell_persent,
        (tbsell.sell_total*tbsell.sell_persent)/100 as persent_value,
        tbsell.sell_total-((tbsell.sell_total*tbsell.sell_persent)/100) as must_thork
        
        from 
        
        tbinstallment inner join tbsell 
        on tbinstallment.installment_id = tbsell.installment_id
        inner join tblottery on tbsell.lottery_id = tblottery.lottery_id
        inner join tbunit on
        tblottery.unit_id = tbunit.unit_id
        inner join tbbrance on tbunit.brance_id = tbbrance.brance_id
        WHERE tbbrance.brance_id =? and tbinstallment.installment = ?
        and tblottery.lottery_id = ?
        
        `, [brance_id, thork.installment, thork.lottery_id], (error, data) => {

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
        return res.status(500).send(error)
    }
}

exports.get_info_old_thork = (req, res) => {
    try {
        brance_id = req.params
        thork = req.params
        logger.info('GET/info-old-thork')
        logger.info(req.params)
        dbcon.query(`
        select 
        tbinstallment.installment,tblottery.lottery_id, tbsell.sell_total,tbsell.sell_persent,
        (tbsell.sell_total*tbsell.sell_persent)/100 as persent_value,
        tbsell.sell_total-((tbsell.sell_total*tbsell.sell_persent)/100) as must_thork,
        (tbthork.thork_by_transfer+tbthork.thork_by_cash) as old_thork
        from 
        tbinstallment inner join tbsell 
        on tbinstallment.installment_id = tbsell.installment_id
        inner join tblottery on tbsell.lottery_id = tblottery.lottery_id
        inner join tbthork
        inner join tbunit on tblottery.lottery_id = tbthork.lottery_id and
        tblottery.unit_id = tbunit.unit_id
        inner join tbbrance on tbunit.brance_id = tbbrance.brance_id
        WHERE tbbrance.brance_id =? and tbinstallment.installment = ?
        and tbthork.lottery_id = ?
        
        `, [brance_id, thork.installment, thork.lottery_id], (error, data) => {

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
        return res.status(500).send("Something wrong")
    }
}