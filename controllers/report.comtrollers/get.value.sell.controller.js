const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
exports.detail_by_installment = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        const installment = req.params.installment
        dbcon.query(`
        select 
tbinstallment.installment,tblottery.lottery_id,
tblottery.seller_id,tbsell.sell_total,tbwin.win_total,
(tbsell.sell_total * tbsell.sell_persent)/100 as persent,
(tbsell.sell_total-(tbsell.sell_total*tbsell.sell_persent)/100) as must_thork,
tbsell.sell_date
from 
tbinstallment inner join tbsell
inner join tbwin on tbinstallment.installment_id
= tbsell.installment_id and tbinstallment.installment_id
= tbwin.installment_id inner join tblottery
on tbsell.lottery_id= tblottery.lottery_id
inner join tbseller inner join tbunit
on tblottery.seller_id = tbseller.seller_id
and tblottery.unit_id = tbunit.unit_id
inner join tbbrance on tbunit.brance_id 
= tbbrance.brance_id
inner join tbcompany on tbbrance.company_id = tbcompany.company_id

where tbbrance.brance_id =? and tbinstallment.installment=?
        `, [brance_id, installment], (error, data) => {

            if (error) {
                logger.error(error)
                res.status(401).send("Error")
            }

          else  res.send({ data: data, message: "Success" })
        })
    } catch (error) {
        logger.error(error)
        res.status(500).send("Something wrong")
    }
}

exports.detail_by_installment_unit = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        const unit = req.params.unit
        const installment = req.params.installment
        dbcon.query(`
        select 
tbinstallment.installment,tblottery.lottery_id,
tblottery.seller_id,tbsell.sell_total,tbwin.win_total,
(tbsell.sell_total * tbsell.sell_persent)/100 as persent,
(tbsell.sell_total-(tbsell.sell_total*tbsell.sell_persent)/100) as must_thork,
tbsell.sell_date
from 
tbinstallment inner join tbsell
inner join tbwin on tbinstallment.installment_id
= tbsell.installment_id and tbinstallment.installment_id
= tbwin.installment_id inner join tblottery
on tbsell.lottery_id= tblottery.lottery_id
inner join tbseller inner join tbunit
on tblottery.seller_id = tbseller.seller_id
and tblottery.unit_id = tbunit.unit_id
inner join tbbrance on tbunit.brance_id 
= tbbrance.brance_id
inner join tbcompany on tbbrance.company_id = tbcompany.company_id

where tbbrance.brance_id =? and tbunit.unit=? and tbinstallment.installment=?
        `, [brance_id, unit, installment], (error, data) => {

            if (error) {
                logger.error(error)
                res.status(401).send("Error")
            }

           else res.send({ data: data, message: "Success" })
        })
    } catch (error) {
        logger.error(error)
        res.status(500).send("Something wrong")
    }
}


//get sum and average from all sell
exports.sum_by_installment = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        const installment = req.params.installment


        var bos_persent = 0
        var count = 0

        //get persent of bos
        dbcon.query(`select persent from tbpersent where persent_id='P3'`, (error, data) => {
            if (error) {
                logger.error(error)
                res.status(401).send("Error")
            }
            else{
                const data1 = data[0]
                bos_persent = data1.persent
            }
            

            //get count of lottery
            dbcon.query(`select count(tblottery.lottery_id) as count from
        tbinstallment inner join tbsell
        inner join tbwin on tbinstallment.installment_id
        = tbsell.installment_id and tbinstallment.installment_id
        = tbwin.installment_id inner join tblottery
        on tbsell.lottery_id= tblottery.lottery_id
        inner join tbseller inner join tbunit
        on tblottery.seller_id = tbseller.seller_id
        and tblottery.unit_id = tbunit.unit_id
        inner join tbbrance on tbunit.brance_id 
        = tbbrance.brance_id
        inner join tbcompany on tbbrance.company_id = tbcompany.company_id
        
        where tbbrance.brance_id =? and tbinstallment.installment=?
        `, [brance_id, installment], (error, data) => {
                if (error) {
                    logger.error(error)
                    res.status(401).send("Error")
                }
                
                else{
                    const _count = data[0]
                    count = _count.count
                }
                //sum
                dbcon.query(`
                    select 
                    sum((tbsell.sell_total)-(tbsell.sell_total * tbsell.sell_persent)/100) as sum_must_thork,
                    sum(tbsell.sell_total) as sum_sell,sum(tbwin.win_total) as sum_win,
                    sum(tbsell.sell_total)/${count} as average_per_lottery,
                    sum((tbsell.sell_total * ${bos_persent})/100) as bos_persent
            
            from 
            tbinstallment inner join tbsell
            inner join tbwin on tbinstallment.installment_id
            = tbsell.installment_id and tbinstallment.installment_id
            = tbwin.installment_id inner join tblottery
            on tbsell.lottery_id= tblottery.lottery_id
            inner join tbseller inner join tbunit
            on tblottery.seller_id = tbseller.seller_id
            and tblottery.unit_id = tbunit.unit_id
            inner join tbbrance on tbunit.brance_id 
            = tbbrance.brance_id
            inner join tbcompany on tbbrance.company_id = tbcompany.company_id
            
            where tbbrance.brance_id =? and tbinstallment.installment=?
                    `, [brance_id, installment], (error, data) => {

                    if (error) {
                        logger.error(error)
                        res.status(401).send("Error")
                    }

                   else res.send({ data: data, message: "Success" })
                })

            })

        })




    } catch (error) {
        logger.error(error)
        res.status(500).send("Something wrong")
    }
}

//get sum and average from all sell
exports.sum_by_installment_unit = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        const unit = req.params.unit
        const installment = req.params.installment

        let bos_persent = 0
        let count = 0
        //get persent of bos
        dbcon.query(`select persent from tbpersent where persent_id='P3'`, (error, data) => {

            if (error) {
                logger.error(error)
                res.status(401).send("Error")
            }
            else{
                const data1 = data[0]
                bos_persent = data1.persent
            }
            
            //get count of lottery
            dbcon.query(`select count(tblottery.lottery_id) as count from
tbinstallment inner join tbsell
inner join tbwin on tbinstallment.installment_id
= tbsell.installment_id and tbinstallment.installment_id
= tbwin.installment_id inner join tblottery
on tbsell.lottery_id= tblottery.lottery_id
inner join tbseller inner join tbunit
on tblottery.seller_id = tbseller.seller_id
and tblottery.unit_id = tbunit.unit_id
inner join tbbrance on tbunit.brance_id 
= tbbrance.brance_id
inner join tbcompany on tbbrance.company_id = tbcompany.company_id

where tbbrance.brance_id =? and tbunit.unit=? and tbinstallment.installment=?
`, [brance_id, unit, installment], (error, data) => {
                if (error) {
                    logger.error(error)
                    res.status(401).send("Error")
                }
                else{
                    const _count = data[0]
                    count = _count.count
    
                }
               
                //get sum
                dbcon.query(`
        select 
        sum((tbsell.sell_total)-(tbsell.sell_total * tbsell.sell_persent)/100) as sum_must_thork,
        sum(tbsell.sell_total) as sum_sell,sum(tbwin.win_total) as sum_win,
        sum(tbsell.sell_total)/${count} as average_per_lottery,
        sum((tbsell.sell_total * ${bos_persent})/100) as bos_persent

from 
tbinstallment inner join tbsell
inner join tbwin on tbinstallment.installment_id
= tbsell.installment_id and tbinstallment.installment_id
= tbwin.installment_id inner join tblottery
on tbsell.lottery_id= tblottery.lottery_id
inner join tbseller inner join tbunit
on tblottery.seller_id = tbseller.seller_id
and tblottery.unit_id = tbunit.unit_id
inner join tbbrance on tbunit.brance_id 
= tbbrance.brance_id
inner join tbcompany on tbbrance.company_id = tbcompany.company_id

where tbbrance.brance_id =? and tbunit.unit and tbinstallment.installment=?
        `, [brance_id, unit, installment], (error, data) => {
                    if (error) {
                        logger.error(error)
                        res.status(401).send("Error")
                    }
                   else res.send({ data: data, message: "Success" })
                })
            })
        })
    } catch (error) {
        logger.error(error)
        res.status(500).send("Something wrong")
    }
}

