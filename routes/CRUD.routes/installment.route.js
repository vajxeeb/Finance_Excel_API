
const express = require('express')

const router = express.Router();

const installment = require('../../controllers/CRUD.controllers/installment.controller')

/**
 * @awagger
 * tags:
 *   name: Installment
 *   description: The installment managing API
 */
/**
 * @swagger
 * /installment/{brance_id}:
 *  get:
 *   summary: get all brance
 *   tags: [Installment]
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The brance id
 *   responses:
 *    200:
 *     description: Success
 *    404:
 *     description: Not found
 *    500:
 *     description: Something error
 */
router.get('/installment/:brance_id',installment.getinstallment)


module.exports = router