
const express = require('express')

const router = express.Router()

const persent = require('../../controllers/CRUD.controllers/persent.controller')

/**
 * @swagger
 * tags:
 *  name: persent
 *  description: the persent managing API
 */ 

/**
 * @swagger
 * components:
 *  schemas:
 *   persent:
 *    type: object
 *    required:
 *      - persent_id
 *      - type_of_persent_id
 *      - persent
 *      - brance_id:
 *    properties:
 *     persent_id:
 *      type: integer
 *      description: The auto_increment of persent id
 *     type_of_persent_id:
 *      type: integer
 *      description: Persent type
 *     persent:
 *      type: integer
 *      description: Persent
 *     brance_id:
 *      type: integer
 *      description: Brance Id
 *    example:
 *      persent_id: 1
 *      type_of_persent_id: 2
 *      persent: 20
 *      brance_id: 2
 */


/**
 * @swagger
 * /persent:
 *  post:
 *   summary: post the persent
 *   tags: [persent]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/persent'
 *   responses:
 *     200:
 *       description: The persent was sucessfully updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/persent'
 *     400:
 *       description: The persent was not found
 *     500:
 *       description: Some error happened
 */
 router.post('/persent',persent.create)

/**
 * @swagger
 * /persent:
 *  put:
 *   summary: Update the persent by id
 *   tags: [persent]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/persent'
 *   responses:
 *     200:
 *       description: The persent was sucessfully updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/persent'
 *     400:
 *       description: The persent was not found
 *     500:
 *       description: Some error happened
 */
router.put('/persent',persent.update)
/**
 * @swagger
 * /persent/{brance_id}:
 *  get:
 *   summary: get all persent
 *   tags: [persent]
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
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/persent'
 * 
 */
router.get('/persent/:brance_id',persent.getallpersent)

module.exports = router