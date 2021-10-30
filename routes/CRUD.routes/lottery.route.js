

const express = require('express');

const router = express.Router();

const lotterycontroll = require('../../controllers/CRUD.controllers/lottery.controller');

const keycloak = require('../../keycloak-confilg/keycloak-config').getKeycloak();

/**
 * @swagger
 * tags:
 *  name: lottery
 *  description: the lottery managing API
 */ 

/**
 * @swagger
 * components:
 *  schemas:
 *   lottery:
 *    type: object
 *    required:
 *      - lottery_id
 *      - lottery_name
 *      - lottery_printname
 *      - lottery_refernumber
 *      - lottery_status
 *      - unit_id
 *      - seller_id
 *    properties:
 *     lottery_id:
 *      type: string
 *      description: lottery id
 *     lottery_name:
 *      type: string
 *      description: lottery name
 *     lottery_printname:
 *      type: string
 *      description: lottey print name
 *     lottery_refernumber:
 *      type: string
 *      description: lottery refer number
 *     lottery_status:
 *      type: string
 *      description: lottery status
 *     unit_id:
 *      type: integer
 *      description: unit id 
 *    example:
 *      lottery_id: 2234
 *      lottery_name: xxx
 *      lottery_printname: xxx
 *      lottery_refernumber: xxx
 *      lottery_status: free
 *      unit_id: 2
 */
   
/**
 * @swagger
 * /lottery:
 *  post:
 *   summary: Create a new lottery
 *   tags: [lottery]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/lottery'
 *   responses:
 *    200:
 *     description: The lottery was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/lottery'
 *    500:
 *     description: Some server error
 */
router.post('/lottery', lotterycontroll.createlottery);
/**
 * @swagger
 * /lottery/{lottery_id}:
 *   put:
 *     summary: Delete the lottery by id
 *     tags: [lottery]
 *     parameters:
 *       - in: path
 *         name: lottery_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The lottery id
 *     responses:
 *        200:
 *          description: The lottery was deleted
 *        404:
 *          description: The lottery was not found
 *         
 */
router.put('/lottery/:lottery_id',lotterycontroll.deletelottery);
/**
 * @swagger
 * /lottery:
 *  put:
 *   summary: Update the lottery by id
 *   tags: [lottery]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/lottery'
 *   responses:
 *     200:
 *       description: The lottery was sucessfully updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/lottery'
 *     400:
 *       description: The lottery was not found
 *     500:
 *       description: Some error happened
 */
router.put('/lottery',lotterycontroll.updatelottery);
/**
 * @swagger
 * /lottery/{brance_id}:
 *  get:
 *   summary: get all lottery
 *   tags: [lottery]
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The id of brance
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/lottery'
 * 
 */
router.get('/lottery/:brance_id',lotterycontroll.get);
// /** 
// * @swagger
// * /lottery/{brance_id}/{lottery_id}:
// *  get:
// *   summary: get lottery by id
// *   parameters:
// *    - in: path
// *      name: brance_id
// *      schema:
// *       type: integer
// *      required: true
// *      description: The id of brance
// *    - in: path
// *      name: lottery_id
// *      schema:
// *       type: string
// *      required: true
// *      description: lottery id
// *   tags: [lottery]
// *   responses:
// *    200:
// *     description: Success
// */
// router.get('/lottery/:brance_id/:lottery_id',lotterycontroll.get_by_id);
// /** 
// * @swagger
// * /lottery/{unit_id}:
// *  get:
// *   summary: get lottery  unit
// *   parameters:
// *    - in: path
// *      name: unit_id
// *      schema:
// *       type: integer
// *      required: true
// *      description: unit id
// *   tags: [lottery]
// *   responses:
// *    200:
// *     description: Success
// */
// router.get('/lottery/:unit_id',lotterycontroll.get_by_unit);

// /** 
// * @swagger
// * /lottery/free/{unit_id}:
// *  get:
// *   summary: get lottery  unit
// *   parameters:
// *    - in: path
// *      name: unit_id
// *      schema:
// *       type: integer
// *      required: true
// *      description: unit id
// *   tags: [lottery]
// *   responses:
// *    200:
// *     description: Success
// */
// router.get('/lottery/free/:unit_id',lotterycontroll.getlottery_free);

module.exports = router;