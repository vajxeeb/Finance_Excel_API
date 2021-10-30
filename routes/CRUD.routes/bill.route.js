
const express = require('express');

const router = express.Router();

const bill = require('../../controllers/CRUD.controllers/bill.controller');


/**
 * @swagger
 * tags:
 *  name: Generate bill to preview PDF
 *  description: the bill managing API
 */

/**
 * @swagger
 * /bill/{thork_id}:
 *  get:
 *   summary: get bill for pay 
 *   tags: [Generate bill to preview PDF]
 *   parameters:
 *    - in: path
 *      name: thork_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The thork id
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Something error
 */
router.get('/bill/:thork_id', bill.getbill)


module.exports = router
