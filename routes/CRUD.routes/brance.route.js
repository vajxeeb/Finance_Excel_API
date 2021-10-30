
const express = require('express')
const router = express.Router()

const brance = require('../../controllers/CRUD.controllers/brance.controller')
const keycloak = require('../../keycloak-confilg/keycloak-config').getKeycloak();
//swagger name
/**
 * @swagger
 * tags:
 *  name: Brance
 *  description: the brance managing API
 */
//swagger component

/**
 * @swagger
 * components:
 *  schemas:
 *   brance:
 *    type: object
 *    required:
 *      - brance_name
 *      - brance_address
 *    properties:
 *     brance_id:
 *      type: integer
 *      description: the auto_increment id of the brance
 *     brance_name:
 *      type: string
 *      description: The name of brance
 *     brance_address:
 *      type: string
 *      description: The address of brance 
 *    company_id:
 *      type: int
 *      description: The company id 
 *    example:
 *      brance_id: 4
 *      brance_name: xxx
 *      brance_address: xxx xxx xxx
 *      company_id: 2
 */
   
//  *  securitySchemes:
//  *   bearerAuth:
//  *    type: http
//  *    scheme: bearer
//  *    bearerFormat: JWT
//*   security: [{ "Bearer": [] }]


//create brance swagger
/**
 * @swagger
 * /brance:
 *  post:
 *   summary: Create a new brance
 *   tags: [Brance]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/brance'
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       description: Unauthorization
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 */
router.post('/brance',brance.createbrance)

//get swagger
/**
 * @swagger
 * /brance/{company_id}:
 *  get:
 *   summary: get all brance
 *   tags: [Brance]
 *   parameters:
 *    - in: path
 *      name: company_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The company id
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       description: Unauthorization
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 * 
 */

router.get('/brance/:company_id',keycloak.protect(),brance.getbrance)

//update
/**
 * @swagger
 * /brance:
 *  put:
 *   summary: Update the brance by id
 *   tags: [Brance]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/brance'
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       description: Unauthorization
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 */

router.put('/brance',brance.updatebrance)

/**
 * @swagger
 * /brance/{brance_id}:
 *   put:
 *     summary: Delete the brance by brance_id
 *     tags: [Brance]
 *     parameters:
 *       - in: path
 *         name: brance_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brance id
 *     responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Unauthorization
 *      403:
 *       description: Forbiden
 *      404:
 *       description: Not found
 *      500:
 *       description: Some server error
 */

router.put('/brance/:brance_id',brance.detelebrance)

module.exports = router