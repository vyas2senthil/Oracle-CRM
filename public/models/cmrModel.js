const fetch = require('node-fetch');
const btoa = require('btoa');

class Crm {

    constructor(){

    }

    static getCrmLeads(action, endpoint, password, lead, leadRank, account, customer, country, address, city, postalCode, description, customerEmail, req, res){

        var url = "";

        if(action === "Create Lead"){

            url = endpoint + "/crmRestApi/resources/latest/leads";

            fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(process.env.CRMUSERNAME + ":" + password)
                },
                // to be completed
                body: JSON.stringify({
                    Rank: leadRank,
                    CustomerPartyName: account,
                    Description: description,
                    PrimaryContactPartyName: customer,
                    PrimaryContactCountry: country,
                    PrimaryContactAddress1: address,
                    PrimaryContactCity: city,
                    PrimaryContactPostalCode: postalCode,
                    PrimaryContactEmailAddress: customerEmail
                }),
            })
            .then(function(response){

                if(response.status === 401){
                    res.status(401).send("Authentication Error");
                } else {
                    return response.json();
                }
                
            })
            .then(function(data){
                res.status(201).send(data);
            })
            .catch(function(error){
                res.status(501).send(error);
            })

        } 
        // Retrieve a Lead call
        else if(action === "Retrieve Lead"){
            
            url = endpoint + "/crmRestApi/resources/latest/leads/" + lead;

            fetch(url, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(process.env.CRMUSERNAME + ":" + password)
                }
            })
            .then(function(response){

                if(response.status === 401){
                    res.status(401).send("Authentication Error");
                } else {
                    return response.json();
                }
                
            })
            .then(function(data){
                res.status(201).send(data);
            })
            .catch(function(error){
                res.status(501).send(error);
            })

        } else {

            res.status(501).send("There was a problem");
        }

        
    }
}

module.exports = Crm;