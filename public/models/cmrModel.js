const fetch = require('node-fetch');
const btoa = require('btoa');

class Crm {

    constructor(){

    }

    static getCrmLeads(action, endpoint, password, lead, req, res){

        var url = "";

        if(action === "Create Lead"){

            url = endpoint + "/crmRestApi/resources/latest/leads/100000005482357";

            fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(process.env.CRMUSERNAME + ":" + password)
                },
                // to be completed
                body: JSON.stringify({
                    primaryContact: {id: userId},
                    subject: customerText
                }),
            })
            .then(function(response){

                if(response.status === 401){
                    console.log("AUTHENTICATION ERROR");
                    res.status(401).send("Authentication Error");
                } else {
                    return response.json();
                }
                
            })
            .then(function(data){
                console.log(data);
                res.status(201).send(data);
            })
            .catch(function(error){
                res.status(501).send(error);
            })

        } else if(action === "Retrieve Lead"){
            
            url = endpoint + "/crmRestApi/resources/latest/leads/" + lead;

            fetch(url, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(process.env.CRMUSERNAME + ":" + password)
                }
            })
            .then(function(response){

                if(response.status === 401){
                    console.log("AUTHENTICATION ERROR");
                    res.status(401).send("Authentication Error");
                } else {
                    return response.json();
                }
                
            })
            .then(function(data){
                console.log(data);
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