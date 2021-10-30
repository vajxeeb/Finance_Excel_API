
const express = require('express')

const router = express.Router()

const sum = require('../../controllers/report.comtrollers/sum.own.all.controller')

/**
 * @swagger
 * tags:
 *  name: Sum-Own-All
 *  description: Sum Own All API
 */
/**
 * @swagger
 * /sum-own-all/{brance_id}/{date}:
 *  get:
 *   summary: Get sum not pay by date 
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
 *   tags: [Sum-Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-own-all/:brance_id/:date',sum.Sum_own_all_by_date)
/**
 * @swagger
 * /sum-own-all/{brance_id}/{date}/{installment}:
 *  get:
 *   summary: Get sum own all by date and installment
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
 *   tags: [Sum-Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-own-all/:brance_id/:date/:installment',sum.Sum_own_all_by_date_installment)
/**
 * @swagger
 * /sum-own-all/{brance_id}/{date}/{unit}:
 *  get:
 *   summary: Get sum own all by date and unit
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
 *   tags: [Sum-Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-own-all/:brance_id/:date/:unit',sum.Sum_own_all_by_date_unit)

/**
 * @swagger
 * /sum-own-all/{brance_id}/{date}/{unit}/{installment}:
 *  get:
 *   summary: Get sum own all by date and unit and installment
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
 *   tags: [Sum-Own-All]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/sum-own-all/:brance_id/:date/:unit/:installment',sum.Sum_own_all_by_date_unit_installment)


module.exports = router

