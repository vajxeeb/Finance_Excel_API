
const express = require('express')

const router = express.Router()

const total_sell = require('../../controllers/import.controllers/sell.controller')

const upload =  require('../../middlewares/upload')

/**
 * @swagger
 * tags:
 *  name: sell
 *  description: Get data's sell from file excel
 */


router.post('/sell',upload.single("file"),total_sell.createtotal_sell)

// router.get('/sell/get/:brance_id/:unit/:installment/:lottery_id',total_sell.get_by_lottery_installment)
// router.get('/sell/get/:brance_id/:unit/:installment',total_sell.get_by_installment_unit)


module.exports = router

