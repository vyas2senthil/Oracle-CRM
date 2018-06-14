const fetch = require('node-fetch');
const btoa = require('btoa');

class Crm {

    constructor(){

    }

    static getCrmLeads(password, req, res){

        fetch('https://ucf1-fap0609-fa-ext.oracledemos.com/crmRestApi/resources/latest/leads/100000005482357', {
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
    }
}

module.exports = Crm;