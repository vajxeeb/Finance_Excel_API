
const express = require('express')

const router = express.Router()

const typeofpersent = require('../../controllers/CRUD.controllers/type_of_persent.controller')


router.post('/typeofpersent',typeofpersent.create)
router.get('/typeofpersent',typeofpersent.get)


module.exports = router;