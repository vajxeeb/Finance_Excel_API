
const express = require('express');

const router = express.Router();

const companycontroller = require('../../controllers/CRUD.controllers/company.controller');
//const keycloak = require('../../keycloak-confilg/keycloak-config').getKeycloak();


// router.post('/company',keycloak.protect(),companycontroller.createcompany);
// router.get('/company',keycloak.protect(),companycontroller.getcompany);
// router.put('/company',keycloak.protect(),companycontroller.updatecompany);

// router.post('/company',companycontroller.createcompany);
// router.get('/company',companycontroller.getcompany);
 router.put('/company',companycontroller.updatecompany);

module.exports = router;