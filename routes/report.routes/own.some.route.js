
const express = require('express')

const router = express.Router()

const own_some = require('../../controllers/report.comtrollers/own.some.controller')

/**
 * @swagger
 * tags:
 *  name: Own-Some
 *  description: Own Some API
 */
/**
 * @swagger
 * /own-some/{brance_id}/{date}:
 *  get:
 *   summary: Get own some by date 
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *    - in: path
 *      name: date
 *      schema:
 *       type: string
 *      required: true
 *      description: Date
 *   tags: [Own-Some]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-some/:brance_id/:date',own_some.Own_Some_By_Date)
/**
 * @swagger
 * /own-some/{brance_id}/{date}/{installment}:
 *  get:
 *   summary: Get own some by date and installment
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *    - in: path
 *      name: date
 *      schema:
 *       type: string
 *      required: true
 *      description: Date
 *    - in: path
 *      name: installment
 *      schema:
 *       type: string
 *      required: true
 *      description: Installment
 *   tags: [Own-Some]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-some/:brance_id/:date/:installment',own_some.Own_Some_By_Date_Installment)

/**
 * @swagger
 * /own-some/{brance_id}/{date}/{unit}:
 *  get:
 *   summary: Get own some by date and unit
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *    - in: path
 *      name: date
 *      schema:
 *       type: string
 *      required: true
 *      description: Date
 *    - in: path
 *      name: unit
 *      schema:
 *       type: string
 *      required: true
 *      description: Unit
 *   tags: [Own-Some]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-some/:brance_id/:date/:unit',own_some.Own_Some_By_Date_Unit)

/**
 * @swagger
 * /own-some/{brance_id}/{date}/{unit}/{installment}:
 *  get:
 *   summary: Get own some by date and unit and installment
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *    - in: path
 *      name: date
 *      schema:
 *       type: string
 *      required: true
 *      description: Date
 *    - in: path
 *      name: unit
 *      schema:
 *       type: string
 *      required: true
 *      description: Unit
 *    - in: path
 *      name: installment
 *      schema:
 *       type: string
 *      required: true
 *      description: Installment
 *   tags: [Own-Some]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-some/:brance_id/:date/:unit/:installment',own_some.Own_Some_By_Date_Unit_Installment)

module.exports = router

