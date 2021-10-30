
const express = require('express')

const router = express.Router()

const own_all = require('../../controllers/report.comtrollers/own.all.controller')

/**
 * @swagger
 * tags:
 *  name: Own-All
 *  description: Own all API
 */
/**
 * @swagger
 * /own-all/{brance_id}/{date}:
 *  get:
 *   summary: Get own all by date 
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
 *   tags: [Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-all/:brance_id/:date',own_all.Own_All_By_Date)
/**
 * @swagger
 * /own-all/{brance_id}/{date}/{installment}:
 *  get:
 *   summary: Get own all by date and installment
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
 *   tags: [Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-all/:brance_id/:date/:installment',own_all.Own_All_By_Date_Installment)

/**
 * @swagger
 * /own-all/{brance_id}/{date}/{unit}:
 *  get:
 *   summary: Get own all by date and unit
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
 *   tags: [Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-all/:brance_id/:date/:unit',own_all.Own_All_By_Date_Unit)

/**
 * @swagger
 * /own-all/{brance_id}/{date}/{unit}/{installment}:
 *  get:
 *   summary: Get own all by date and unit and installment
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
 *   tags: [Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/own-all/:brance_id/:date/:unit/:installment',own_all.Own_All_By_Date_Unit_Installment)


module.exports = router

