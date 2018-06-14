// set ui elements when the application starts
document.querySelector('#btnSaveUrl').setAttribute("style", "visibility: hidden;");

//submit form event
document.querySelector('#btnFormSubmit').onclick  = function(){
    alert("Test");
}

// save endpoint url
document.querySelector('#endpointUrl').addEventListener("keyup", function(e){
    if(this.value === "" || this.value === null){
        document.querySelector('#btnSaveUrl').setAttribute("style", "visibility: hidden;");
    } else {
        document.querySelector('#btnSaveUrl').setAttribute("style", "visibility: visible;");
    }
});







//endpointPassword

//btnSavePassword