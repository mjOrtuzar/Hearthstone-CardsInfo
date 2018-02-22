//json All Cards
//https://omgvamp-hearthstone-v1.p.mashape.com/cards 

$(document).ready(()=> {
   const head=$("#head").hide();
   const search=$("#SearchBar").hide();
   const key = 'JtVli4v6fRmsh65TawpfbbmmuxO0p1GDxNujsnGMnHzW41x5uB';

   $.ajax({
    url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method
    data: {}, // Additional parameters here
    datatype: 'json',
    
    beforeSend: function(xhr) {
	xhr.setRequestHeader("X-Mashape-Authorization", key); // Enter here your Mashape key
    }
   })
   .done(function(response) {
    console.log(response);
    showInfo(response);
   })
    .fail(function(error) {
        console.log('error al cargar la api');
   })

   
    
    
});




//FireBase
//funcion para registrar usuario
function registrar(){
    let email = $('#email').val(); //rescato valor input
    let pass = $('#contrasena').val(); //rescato valor input contraseña

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
//funcion para ingresar usuario
function ingresa() {
    let logEmail = $('#logEmail').val();
    let logPass = $('#logPass').val();
    
    firebase.auth().signInWithEmailAndPassword(logEmail, logPass)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

}
//funcion para cerrar sesion

function cerrar() {
    firebase.auth().signOut()
    .then(function() {
        $("#head").hide();
        $("#SearchBar").hide()
        $("#logeo-Registro").show();
    })
    .catch(function(error) {
        console.log(error)
    })
}

function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          $("#head").show();
          $("#SearchBar").show();
          $("#logeo-Registro").hide();
          console.log('existe usuario activo');
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('no existe usuario activo')
        }
      });
}
observador();
