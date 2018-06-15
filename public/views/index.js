// set ui elements when the application starts
document.querySelector('#btnSaveUrl').setAttribute("style", "visibility: hidden;");
document.querySelector('#btnSavePassword').setAttribute("style", "visibility: hidden;");
document.querySelector('.spinner').setAttribute("style", "visibility: hidden;");
document.querySelector('#lead').setAttribute("style", "visibility: hidden;")


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
    var action = document.querySelector('#actionSelect').value;
    var pwd = "";
    var endpoint = "";
    var lead = document.querySelector('#leadNumber').value;

    //spinner visible
    document.querySelector('.spinner').setAttribute("style", "visibility: visible;");

    if(retrieveFromLocalStorage()){
        pwd = window.atob(localStorage.getItem('endpointPassword'));
        console.log(pwd);
        endpoint = localStorage.getItem('endpoint');
        // submit form with local data
        submitForm(action, endpoint, pwd, lead);
    } else {
        // get the value from the form and submit
        pwd = document.querySelector('#endpointPassword').value;
        console.log(pwd);
        endpoint = document.querySelector('#endpointUrl').value;
        submitForm(action, endpoint, pwd, lead);
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
function submitForm(action, endpoint, pwd, lead){

    console.log("I am here");

    $.ajax({
        type: 'post',
        url: '/crm/leads',
        data: {
            action: action,
            endpoint: endpoint,
            password: pwd,
            lead: lead
        },
        success: data => {
            document.querySelector('.spinner').setAttribute("style", "visibility: hidden;");
            console.log(data);
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
    
}


// display insert lead number
document.querySelector('#actionSelect').addEventListener("change", function(e){

    if(this.value === "Retrieve Lead"){  
        document.querySelector('#lead').setAttribute("style", "visibility: visible;");
    } 
    
    if(this.value === "Create Lead") {
        document.querySelector('#lead').setAttribute("style", "visibility: hidden;")
    }
})