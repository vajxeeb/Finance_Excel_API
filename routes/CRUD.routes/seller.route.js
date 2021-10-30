
const express = require('express')

const router = express.Router()

const seller = require('../../controllers/CRUD.controllers/seller.controller')

/**
 * @swagger
 * tags:
 *  name: Register
 *  description: Register or seller managing API
 */ 


/**
 * @swagger
 * components:
 *  schemas:
 *   Register:
 *    type: object
 *    required:
 *      - seller_name
 *      - seller_age
 *      - seller_job
 *      - seller_phone
 *      - seller_address
 *      - type_of_persent
 *    properties:
 *     seller_id:
 *      type: integer
 *      description: The auto_increment of seller id                                            
 *     seller_name:
 *      type: string
 *      description: The seller name
 *     seller_age:
 *      type: string
 *      description: The seller age
 *     seller_job:
 *      type: string
 *      description: The seller job
 *     seller_phone:
 *      type: string
 *      description: The seller phone
 *     seller_address:
 *      type: string
 *      description: The seller address
 *     type_of_persent_id:
 *      type: integer
 *      description: Type of persent or seller status
 *    example:
 *      seller_id: 23
 *      seller_name: ging
 *      seller_age: 22
 *      seller_job: Dev
 *      seller_phone: 02056789587
 *      seller_address: xxx xxx xxx
 *      type_of_persent_id: 3
 */
   
   
/**
 * @swagger
 * /Register/{lottery_id}:
 *  post:
 *   summary: Create a new seller
 *   tags: [Register]
 *   parameters:
 *    - in: path
 *      name: lottery_id
 *      schema:
 *       type: string
 *      required: true
 *      description: lottery id
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Register'
 *   responses:
 *    201:
 *     description: The Register was successfully created
 *     content:
 *          $ref: '#/components/schemas/Register'
 *    500:
 *     description: Some server error
 */
router.post('/Register/:lottery_id',seller.createseller)
   
/**
 * @swagger
 * /Register:
 *  put:
 *   summary: Create a new seller
 *   tags: [Register]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Register'
 *   responses:
 *    200:
 *     description: The Register was successfully created
 *     content:
 *          $ref: '#/components/schemas/Register'
 *    500:
 *     description: Some server error
 */
    router.put('/Register',seller.update)

/**
 * @swagger
 * /Register/{seller_id}:
 *   put:
 *     summary: Delete the seller by id
 *     tags: [Register]
 *     parameters:
 *       - in: path
 *         name: seller_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The seller id
 *     responses:
 *        200:
 *          description: The seller was deleted
 *        404:
 *          description: The seller was not found
 *         
 */
router.put('/Register/:seller_id',seller.deleteseller)

/**
 * @swagger
 * /Register/{brance_id}:
 *  get:
 *   summary: get all seller
 *   tags: [Register]
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The brance_id
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Register'
 * 
 */
router.get('/Register/:brance_id',seller.get)

module.exports = router