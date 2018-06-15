const router = require('express').Router();
const Crm = require('../models/cmrModel');
/**
 * Route POST - User Registration Confirmation
 */
router.post('/leads', function(req, res){

    if(req.body.action === "Retrieve Lead"){

         if((req.body.password !== null && req.body.password !== undefined) && (req.body.endpoint !== null && req.body.endpoint !== undefined) && (req.body.action !== null && req.body.lead !== undefined) && (req.body.action !== null && req.body.lead !== undefined)){
            Crm.getCrmLeads(req.body.action, req.body.endpoint, req.body.password, req.body.lead, req, res);
        } else {
            res.status(201).send("Bad request: Invalid data passed to the server");
        }

    } else {

        if((req.body.password !== null && req.body.password !== undefined) && (req.body.endpoint !== null && req.body.endpoint !== undefined) && (req.body.action !== null && req.body.action !== undefined)){
            Crm.getCrmLeads(req.body.action, req.body.endpoint, req.body.password, null, req, res);
        } else {
            res.status(201).send("Bad request: Invalid data passed to the server");
        }
    }

    
});

module.exports = router;