const firebaseConfig = {
    apiKey: "AIzaSyDaPRPHd6sw09DB4VpHfpx6W6fuAYr_qWc",
    authDomain: "store-data-65df2.firebaseapp.com",
    databaseURL: "https://store-data-65df2-default-rtdb.firebaseio.com",
    projectId: "store-data-65df2",
    storageBucket: "store-data-65df2.appspot.com",
    messagingSenderId: "724606610653",
    appId: "1:724606610653:web:3462582fe3ff1d9167ff34",
    measurementId: "G-FKGPJP0Q29"
};
var app = firebase.initializeApp(firebaseConfig,"app");
var firebaseRef = app.database().ref('admin');
firebaseRef.on("value", function(snapshot){
    var admin = [];
    var password = [];
    snapshot.forEach(function(element){
          admin.push(snapshot.child(element.key).child('username').val());
          password.push(snapshot.child(element.key).child('password').val());
    })
    document.getElementById("admin-login-btn").addEventListener("click",function(){
        var username1 = document.getElementById("admin-id");        
        var password1 = document.getElementById("admin-password");
        if(  admin.indexOf(username1.value) > -1 ){
          if (password[admin.indexOf(username1.value)] == password1.value ){
                location.replace("admin.html");}
          else{password1.style.borderColor="red";alert('Incorrect Password');}
        }
        else{username1.style.borderColor="red";alert('Access Denied');}
    });
})
document.getElementById('admin-password').addEventListener("input",function(){
  document.getElementById("admin-password").style.borderColor="#ccc";
});
document.getElementById('admin-id').addEventListener("input",function(){
  document.getElementById("admin-id").style.borderColor="#ccc";
});
