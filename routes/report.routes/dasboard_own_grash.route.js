
const express = require('express')

const router = express.Router()

const dasboard_grash_own = require('../../controllers/report.comtrollers/dasboard_grash_own.controller')

/**
 * @swagger
 * tags:
 *  name: Dasboard-Own
 */
/**
 * @swagger
 * /dasboard-own-all/{brance_id}:
 *  get:
 *   summary: Get sum and installment
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *   tags: [Dasboard-Own]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/dasboard-own-all/:brance_id',dasboard_grash_own.get_own_all)
/**
 * @swagger
 * /dasboard-own-unit/{brance_id}/{unit}:
 *  get:
 *   summary: Get sum and installment
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
 *   tags: [Dasboard-Own]
 *   responses:
 *    200:
 *     description: Success
 */
 //router.get('/dasboard-own-unit/:brance_id/:unit',dasboard_grash_own.get_own_unit)


module.exports = router