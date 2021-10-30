
const express = require('express')
const router = express.Router()
const num6 = require('../../controllers/report.comtrollers/report.num6.controller')

router.get('/num6/:brance_id',num6.get)

module.exports = router