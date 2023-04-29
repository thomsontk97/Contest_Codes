
var loginStatus = false;
var userData;
    

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem("User")== null){
        document.getElementById('main').style.display = "flex";
        document.getElementById('profile-page').style.display ="none";
    } else{
        document.getElementById('profile-page').style.display ="flex";
        document.getElementById('main').style.display = "none";

        var obj =  JSON.parse(localStorage.getItem("User"));

        // console.log(Object.keys(obj));

        document.getElementById('pro-name').innerText = `Full Name : ${obj.Name}`;
        document.getElementById('pro-email').innerText = `Email : ${obj.Email}`;
        document.getElementById('pro-password').innerText = `Password : ${obj.Password}`;

       
    }
})



function generateToken() {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < 16; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

function signUp(ev){

    loginStatus = true;

    var name = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var passConfirm = document.getElementById('pass-confirm').value;

    if(name=="" || email == "" || password=="" || passConfirm == ""){
        var error = document.getElementById('error');
        error.style.display = "block";
        ev.preventDefault();
    }else if(passConfirm != password){
        alert("Passwords dont match");
        error.style.display = "none";
        ev.preventDefault();
    } else{
        setTimeout((()=>{
            document.getElementById('profile-page').style.display ="flex";
            document.getElementById('main').style.display = "none";
        }),1000)

        document.getElementById('error').style.display = "none";
        document.getElementById('success').style.display = "block";
        document.querySelector('#form-id').reset();
        ev.preventDefault();
        

    }

    var profileName = document.getElementById('pro-name');
    var profileEmail = document.getElementById('pro-email');
    var profilePass = document.getElementById('pro-password');

    profileName.innerText = `Full Name : ${name}`;
    profileEmail.innerText = `Email : ${email}`;
    profilePass.innerText = `Password : ${password}`;

    var userToken = generateToken();
    console.log("Token: ", userToken); 

    // Store in localStorage

    userData = {
        Name:name,
        Email:email,
        Password:password,
        AccesToken:userToken
    };

    localStorage.setItem("User",JSON.stringify(userData));

}


function logOut(){
    localStorage.removeItem("User");
    document.getElementById('success').style.display = "none";
    document.getElementById('profile-page').style.display ="none";
    document.getElementById('main').style.display = "flex";


}


var signUpBtn = document.getElementById('btn-signup');
signUpBtn.addEventListener('click',signUp);

var logoutBtn = document.getElementById('btn-logout');
logoutBtn.addEventListener('click',logOut);

