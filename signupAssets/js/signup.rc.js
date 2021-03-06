$(document).ready(function(){
    console.log("The document loaded successfully");


// Initialize Firebase
          var config = {
            apiKey: "AIzaSyBDM99ZrsLu4tolJ_HzLJdqCH5b0O1RoJo",
            authDomain: "ronaldtestproject2.firebaseapp.com",
            databaseURL: "https://ronaldtestproject2.firebaseio.com",
            projectId: "ronaldtestproject2",
            storageBucket: "ronaldtestproject2.appspot.com",
            messagingSenderId: "976377199219"
          };
          firebase.initializeApp(config);
     
//new variables
var db = firebase.database();
var email = "";
var password1 = "";
var password2 = "";

//sign-UP by clicking JOIN
$("#signUp").on("click", function (event) {
    event.preventDefault();
    console.log("signUp was clicked");

        email = $("#email-input").val().trim();
        password1 = $("#password1-input").val().trim();
        password2 = $("#password2-input").val().trim();

    // checking passwords match
    if (password1 != password2) {
        $("#response").text("The passwords entered did not match");
        console.log("The passwords entered did not match. User " + email + " was NOT created!");
    }
    else {
        validateLength();
        }

    // Validate password length
    function validateLength () {
    if (password1.length < 5) {
        $("#response").text("The password must be at least 5 characters long.");    
        console.log("The passwords entered is too short. User " + email + " was NOT created!");    
    } else {
        //console.log("Password meets requirement!")
        validateEmail();
    }
    }

    //Check if it's a valid emailaddress
    function validateEmail() {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
            console.log("Email address provided ("+ email + ") meets email address format");
            console.log("Password meets requirement!")
            console.log("Creating new user " + email + " in database");
            dbWrite2();
        }
        else
        {
        $("#response").text(email + " is not a valid email address");
        console.log("The email address provided (" + email + ") is invalid");
        }
    }

        function dbWrite2() {
            email = email;
            password = password1;
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
                console.log("User sent to firebase");
                $("#response").text("User " + email + " was created.");


            }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code);
        console.log(error.message);
        $("#response").text(error.message);

        });
        $(".input-lg").text("");
        $(".input-lg").val("");

    }

});

//sign in

    $("#sign-in").on("click", function (event) {
        // console.log("sign-in was clicked")
        event.preventDefault();
        email = $("#email-input2").val().trim();
        password = $("#password-input2").val().trim();

        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {

            sessionStorage.clear();
            sessionStorage.setItem("cityuser", email);
            console.log("User " + email + " is attempting to login...");
            loggedIn();

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
    
            console.log("errors code received: " + errorCode);
            console.log("errors message received: " + errorMessage);
    
             $("#response-2").text(errorCode);

        });

}); //sign-in

function loggedIn () {
var loggedUser = sessionStorage.getItem("cityuser");
console.log("Logged as user " + loggedUser);
//to Map
window.location.href = "map.html";
};

}); //doc.ready
