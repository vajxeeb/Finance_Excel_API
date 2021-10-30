
const express = require('express')
const router = express.Router();

const _login = require('../../controllers/CRUD.controllers/login.controller');
//swagger name
/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Login API
 */
//swagger component

/**
 * @swagger
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    required:
 *      - username
 *      - password
 *    properties:
 *     Username:
 *      type: string
 *      description: Username
 *     Password:
 *      type: string
 *      description: Password
 *    example:
 *      username: Yourname
 *      password: 12345
 */
   

//create brance swagger
/**
 * @swagger
 * /login:
 *  post:
 *   summary: Login
 *   tags: [Login]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Login'
 *   responses:
 *    200:
 *     description: Login was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Login'
 *    500:
 *     description: Some server error
 */
router.post('/login',_login.login);

module.exports = router;