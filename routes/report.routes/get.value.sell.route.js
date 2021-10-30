
const express = require('express')
const router = express.Router()
const allsell = require('../../controllers/report.comtrollers/get.value.sell.controller')



//swagger name
/**
 * @swagger
 * tags:
 *  name: Get-Value-Sell
 *  description: Get value sell managing API
 */

/**
 * @swagger
 * /sell-value-detail/{brance_id}/{installment}:
 *  get:
 *   summary: Get sell value detail
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *    - in: path
 *      name: installment
 *      schema:
 *       type: string
 *      required: true
 *      description: Installment
 *   tags: [Get-Value-Sell]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Not found
 */   
router.get('/sell-value-detail/:brance_id/:installment',allsell.detail_by_installment)
/**
 * @swagger
 * /sell-value-detail/{brance_id}/{unit}/{installment}:
 *  get:
 *   summary: Get sell value detail
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
 *      description: Unit
 *    - in: path
 *      name: installment
 *      schema:
 *       type: string
 *      required: true
 *      description: Installment
 *   tags: [Get-Value-Sell]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Not found
 */ 
router.get('/sell-value-detail/:brance_id/:unit/:installment',allsell.detail_by_installment_unit)
/**
 * @swagger
 * /sell-value-sum/{brance_id}/{installment}:
 *  get:
 *   summary: Get sell value detail
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Brance Id
 *    - in: path
 *      name: installment
 *      schema:
 *       type: string
 *      required: true
 *      description: Installment
 *   tags: [Get-Value-Sell]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Not found
 */ 
router.get('/sell-value-sum/:brance_id/:installment',allsell.sum_by_installment)
/**
 * @swagger
 * /sell-value-sum/{brance_id}/{unit}/{installment}:
 *  get:
 *   summary: Get sell value detail
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
 *      description: Unit
 *    - in: path
 *      name: installment
 *      schema:
 *       type: string
 *      required: true
 *      description: Installment
 *   tags: [Get-Value-Sell]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Not found
 */ 
router.get('/sell-value-sum/:brance_id/:unit/:installment',allsell.sum_by_installment_unit)

module.exports = {router}