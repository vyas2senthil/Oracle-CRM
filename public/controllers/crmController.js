const router = require('express').Router();
const Crm = require('../models/cmrModel');
/**
 * Route POST - User Registration Confirmation
 */
router.post('/leads', function(req, res){

    // leadRank, account, customer, country, address, city, postalCode, description, customerEmail

    if(req.body.action === "Retrieve Lead"){

         if((req.body.password !== null && req.body.password !== undefined) && (req.body.endpoint !== null && req.body.endpoint !== undefined) && (req.body.action !== null && req.body.lead !== undefined) && (req.body.action !== null && req.body.lead !== undefined)){
            Crm.getCrmLeads(req.body.action, req.body.endpoint, req.body.password, req.body.lead, null, null, null, null, null, null, null, null, null, req, res);
        } else {
            res.status(201).send("Bad request: Invalid data passed to the server");
        }

    } else {

        if((req.body.password !== null && req.body.password !== undefined) && (req.body.endpoint !== null && req.body.endpoint !== undefined) && (req.body.action !== null && req.body.action !== undefined)){
            Crm.getCrmLeads(req.body.action, req.body.endpoint, req.body.password, null, req.body.leadRank, req.body.account, req.body.customer, req.body.country, req.body.address, req.body.city, req.body.postalCode, req.body.description, req.body.customerEmail, req, res);
        } else {
            res.status(201).send("Bad request: Invalid data passed to the server");
        }
    }

    
});

module.exports = router;