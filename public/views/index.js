// set ui elements when the application starts
document.querySelector('#btnSaveUrl').setAttribute("style", "visibility: hidden;");
document.querySelector('#btnSavePassword').setAttribute("style", "visibility: hidden;");
document.querySelector('.spinner').setAttribute("style", "visibility: hidden;");
document.querySelector('#lead').setAttribute("style", "visibility: hidden;")
document.querySelector('.results').setAttribute("style", "visibility: hidden;")



// save endpoint url
document.querySelector('#endpointUrl').addEventListener("keyup", function(e){
    if(this.value === "" || this.value === null){
        document.querySelector('#btnSaveUrl').setAttribute("style", "visibility: hidden;");
    } else {
        document.querySelector('#btnSaveUrl').setAttribute("style", "visibility: visible;");
    }
});

// save endpoint to local storage
document.querySelector('#btnSaveUrl').onclick = function(e){
    e.preventDefault();
    var endpointUrl = document.querySelector('#endpointUrl').value;
    localStorage.setItem("endpoint", endpointUrl);
    document.querySelector('#endpointUrl').setAttribute('readonly', 'true');
    this.setAttribute("style", "visibility: hidden;");
}


// save password
document.querySelector('#endpointPassword').addEventListener("keyup", function(e){
    if(this.value === "" || this.value === null){
        document.querySelector('#btnSavePassword').setAttribute("style", "visibility: hidden;");
    } else {
        document.querySelector('#btnSavePassword').setAttribute("style", "visibility: visible;");
    }
});

// save password to local storage
document.querySelector('#btnSavePassword').onclick = function(e){
    e.preventDefault();
    var endpointPassword = document.querySelector('#endpointPassword').value;
    //encrypt and save in local storage
    localStorage.setItem("endpointPassword", window.btoa(endpointPassword));
    document.querySelector('#endpointPassword').setAttribute('readonly', 'true');
    this.setAttribute("style", "visibility: hidden;");
}


//submit form event
document.querySelector('#btnFormSubmit').onclick  = function(e){
    e.preventDefault();

    // form values
    var action = document.querySelector('#actionSelect').value;
    var pwd = "";
    var endpoint = "";
    var lead = document.querySelector('#leadNumber').value;

    var leadRank = document.querySelector('#actionLeadRank').value;
    var account = document.querySelector('#account').value;
    var customer = document.querySelector('#customer').value;
    var country = document.querySelector('#actionLeadCountry').value;
    var address = document.querySelector('#address').value;
    var city = document.querySelector('#city').value;
    var postalCode = document.querySelector('#postalCode').value;
    var description = document.querySelector('#description').value;
    var customerEmail = document.querySelector('#customerEmail').value;

    //spinner visible
    document.querySelector('.spinner').setAttribute("style", "visibility: visible;");

    if(retrieveFromLocalStorage()){
        pwd = window.atob(localStorage.getItem('endpointPassword'));
        endpoint = localStorage.getItem('endpoint');
        // submit form with local data
        submitForm(action, endpoint, pwd, lead, leadRank, account, customer, country, address, city, postalCode, description, customerEmail);
    } else {
        // get the value from the form and submit
        pwd = document.querySelector('#endpointPassword').value;
        endpoint = document.querySelector('#endpointUrl').value;
        submitForm(action, endpoint, pwd, lead, leadRank, account, customer, country, address, city, postalCode, description, customerEmail);
    }    

}

/**
 * Retrieve credentials from local storage
 */
function retrieveFromLocalStorage(){

    if(localStorage.getItem('endpointPassword') !== null && localStorage.getItem('endpoint') !== null){
        document.querySelector('#endpointUrl').setAttribute('readonly', 'true');
        document.querySelector('#endpointPassword').setAttribute('readonly', 'true');

        document.querySelector('#endpointUrl').value = localStorage.getItem('endpoint');
        document.querySelector('#endpointPassword').value = window.atob(localStorage.getItem('endpointPassword'));
        return true;
    } else {
        document.querySelector('#endpointUrl').removeAttribute('readonly');
        document.querySelector('#endpointPassword').removeAttribute('readonly');
        return false;
    }

}

retrieveFromLocalStorage();

/**
 * Submit the form
 * @param {*} action 
 * @param {*} endpoint 
 * @param {*} pwd 
 */
function submitForm(action, endpoint, pwd, lead, leadRank, account, customer, country, address, city, postalCode, description, customerEmail){

    $.ajax({
        type: 'post',
        url: '/crm/leads',
        data: {
            action: action,
            endpoint: endpoint,
            password: pwd,
            lead: lead,
            leadRank: leadRank,
            account: account,
            customer: customer,
            country: country,
            address: address,
            city: city,
            postalCode: postalCode,
            description: description,
            customerEmail: customerEmail
        },
        success: data => {
            document.querySelector('.spinner').setAttribute("style", "visibility: hidden;");
            console.log(data);
            document.querySelector('.results').setAttribute("style", "visibility: visible;")
            // parse results
            parseLead(action, data);
            
        },
        error: error =>{
            document.querySelector('.spinner').setAttribute("style", "visibility: hidden;");
            console.log(error);
        }
    })
}

document.querySelector('#btnFormClear').onclick = function(e){
    e.preventDefault();
    // remove items from local storage
    localStorage.removeItem('endpoint');
    localStorage.removeItem('endpointPassword');
    // restore form
    document.querySelector('#endpointUrl').value = "";
    document.querySelector('#endpointPassword').value = "";
    document.querySelector('#actionSelect').value = "Create Lead";
    
    document.querySelector('#endpointUrl').removeAttribute('readonly');
    document.querySelector('#endpointPassword').removeAttribute('readonly');
    document.querySelector('#lead').setAttribute("style", "visibility: hidden;");

    document.querySelector('#actionLeadRank').value = "";
    document.querySelector('#account').value = "";
    document.querySelector('#customer').value = "";
    document.querySelector('#actionLeadCountry').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#city').value = "";
    document.querySelector('#postalCode').value = "";
    document.querySelector('#description').value = "";
    document.querySelector('#customerEmail').value = "";

    document.querySelector('.results').setAttribute("style", "visibility: hidden;")
    
}


// display insert lead number
document.querySelector('#actionSelect').addEventListener("change", function(e){

    if(this.value === "Retrieve Lead"){  
        document.querySelector('#lead').setAttribute("style", "visibility: visible;");
        document.querySelector('.divCreateLeads').setAttribute("style", "visibility: hidden;")
    } 
    
    if(this.value === "Create Lead") {
        document.querySelector('#lead').setAttribute("style", "visibility: hidden;");
        document.querySelector('.divCreateLeads').setAttribute("style", "visibility: visible;")
    }
})


// Parse Lead
function parseLead(action, leads){
    
    if(leads.items === undefined){
        console.log(leads.Name);
        console.log(leads.LeadNumber);
        console.log(leads.OwnerPartyName);
        console.log(leads.StatusCode);
        console.log(leads.Rank);
        console.log(leads.LeadId);
        addResultsToUI(leads.Name, leads.LeadNumber, leads.OwnerPartyName, leads.StatusCode, leads.Rank, leads.LeadId);
    } 
    else {
        for (const i of leads.items) {
            console.log(i.Name);
            console.log(i.LeadNumber);
            console.log(i.OwnerPartyName);
            console.log(i.StatusCode);
            console.log(i.Rank);
            console.log(leads.LeadId);
            addResultsToUI(i.Name, i.LeadNumber, i.OwnerPartyName, i.StatusCode, i.Rank, i.LeadId);

        }
    }
    
}

// add results to the UI
function addResultsToUI(name, number, owner, status, rank, id){

    document.querySelector('#divLeadName').innerHTML = name;
    document.querySelector('#divLeadNumber').innerHTML = number;
    document.querySelector('#divLeadOwner').innerHTML = owner;
    document.querySelector('#divLeadStatus').innerHTML = status;
    document.querySelector('#divLeadRankResult').innerHTML = rank;
    document.querySelector('#divLeadID').innerHTML = id;
}