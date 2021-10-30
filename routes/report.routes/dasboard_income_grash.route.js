
const express = require('express')

const router = express.Router()

const dasboard_grash_income = require('../../controllers/report.comtrollers/dasboard_grash_income.controller')

/**
 * @swagger
 * tags:
 *  name: Dasboard-Incomne
 */
/**
 * @swagger
 * /dasboard-income-all/{brance_id}:
 *  get:
 *   summary: Get sum of income in each installment
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *   tags: [Dasboard-Incomne]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/dasboard-income-all/:brance_id',dasboard_grash_income.get_income_all)
/**
 * @swagger
 * /dasboard-income-unit/{brance_id}/{unit}:
 *  get:
 *   summary: Get sum of income in each installment
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *    - in: path
 *      name: unit
 *      schema:
 *       type: string
 *      required: true
 *      description: string
 *   tags: [Dasboard-Incomne]
 *   responses:
 *    200:
 *     description: Success
 */
 router.get('/dasboard-income-unit/:brance_id/:unit',dasboard_grash_income.get_income_unit)

module.exports = router