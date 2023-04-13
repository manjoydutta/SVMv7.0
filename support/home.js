const user = sessionStorage.getItem("user");
const logged_in_user = document.querySelector("#voter-id");
logged_in_user.textContent = user;
setInterval(function(){
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("phone");
      location.replace("../index.html");
}, 120000);
document.getElementById('log-out-btn').addEventListener('click',function(){
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("phone");
      location.replace("../index.html");
});
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
var app = firebase.initializeApp(firebaseConfig);
var firebaseRef = app.database();
firebaseRef.ref('user').on("value",function(snapshot){
      sessionStorage.setItem("phone", snapshot.child(user).child('phone').val());
});