//select the required item in variables
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2'); 

// show error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// username validation
function checkUsername(input){
    const nameRegex = /^[a-zA-Z0-9]+$/;
    if(input.value.length>=5 && input.value.length<13){
        if(nameRegex.test(input.value.trim())){
            showSuccess(input);
        }else{
            showError(input, "username invalid.");
        } 
    }
}

// email validation 
function checkEmail(input){
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.value.length>0){
        if(emailRegex.test(input.value.trim())){
            showSuccess(input);
        }else{
            showError(input, "Email is not valid");
        } 
    } 
}

// check strong password or password validation
function checkPassword(input){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/;
    if(input.value.length>=8){
        if(regex.test(input.value.trim())){
            showSuccess(input);
        }else{
            showError(input, "Invalid Password!");
        } 
    }    
}

// check required
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim()===""){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input);
        }
    })
}

// get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check input length
function checkLength(input, min, max){
    if(input.value.length>0){
        if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }else{
        showSuccess(input);
    }
    }
}


// check password matching
function checkPasswordMatch(input1, input2){

    if(input2.value.length>0){
        if(input1.value!==input2.value){
            showError(input2, "passwords do not match");
        }
    }
}

// event listeners
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 12);
    checkUsername(username);
    checkEmail(email);
    checkLength(password, 8, 15);
    checkPassword(password);
    checkPasswordMatch(password, password2);
}) 

