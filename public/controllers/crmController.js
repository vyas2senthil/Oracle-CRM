const router = require('express').Router();
const Crm = require('../models/cmrModel');
/**
 * Route GET - User Registration Confirmation
 */
router.get('/leads', function(req, res){
    if(req.body.password !== null && req.body.password !== undefined){
        Crm.getCrmLeads(req.body.password, req, res);
    } else {
        res.status(201).send("Bad request: Password cannot be empty");
    }
});

module.exports = router;