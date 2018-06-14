const fetch = require('node-fetch');
const btoa = require('btoa');;
require('dotenv').config();

fetch('https://ucf1-fap0609-fa-ext.oracledemos.com/crmRestApi/resources/latest/leads/100000005482357', {
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('john.dunbar' + ":" + 'Rhi86498')
	}
})
.then(function(response){
    if(response.status === 401){
        console.log("AUTHENTICATION ERROR");
    }
    return response.json();
})
.then(function(data){
    console.log(data);
})
.catch(function(error){
    console.error(error);
})