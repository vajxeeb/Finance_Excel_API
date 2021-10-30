
const express = require('express')

const router = express.Router()

const total_win = require('../../controllers/import.controllers/win.controller')
const upload =  require('../../middlewares/upload')
/**
 * @swagger
 * tags: 
 *  name: win
 */

/**
 * @swagger
 * /win:
 *  post:
 *  
 */
router.post('/win/:win_nout',upload.single("file"),total_win.createtotal_win)

/**
 * @swagger
 * /win:
 *  get:
 *   summary: Get all win
 *   tags: [win]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Not found
 */
router.get('/win',total_win.get)
module.exports = router