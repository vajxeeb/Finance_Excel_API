
const express = require('express')

const router = express.Router()

const sum = require('../../controllers/report.comtrollers/income.controller')

/**
 * @swagger
 * tags:
 *  name: Income
 *  description: Sum Income All API
 */
/**
 * @swagger
 * /sum-income/{brance_id}/{date}:
 *  get:
 *   summary: Get sum income by date 
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
 *   tags: [Income]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-income/:brance_id/:date',sum.Income_By_Date)
/**
 * @swagger
 * /sum-income/{brance_id}/{date}/{installment}:
 *  get:
 *   summary: Get sum income by date and installment
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
 *   tags: [Income]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-income/:brance_id/:date/:installment',sum.Income_By_Date_Installment)

/**
 * @swagger
 * /sum-income/{brance_id}/{date}/{unit}:
 *  get:
 *   summary: Get sum income by date and unit
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
 *   tags: [Income]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-income/:brance_id/:date/:unit',sum.Income_By_Date_Unit)

/**
 * @swagger
 * /sum-income/{brance_id}/{date}/{unit}/{installment}:
 *  get:
 *   summary: Get sum income by date and unit and installment
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
 *   tags: [Income]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-income/:brance_id/:date/:unit/:installment',sum.Income_By_Date_Unit_Installment)

/**
 * @swagger
 * /income-detail/{brance_id}/{date}/{installment}:
 *  get:
 *   summary: Get  income detail by date and  installment
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
 *   tags: [Income]
 *   responses:
 *    200:
 *     description: Success
 */
 router.get('/income-detail/:brance_id/:date/:installment',sum.income_detail)
module.exports = router

