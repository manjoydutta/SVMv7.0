
const user = sessionStorage.getItem("user");
const alert_class = document.querySelector('.alert');
const voting = document.querySelector('.voting');
setInterval(function(){
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("phone");
      location.replace("../index.html");
}, 120000);
function checkCheckbox() {
      const checkbox = document.getElementById('myCheckbox');
      if(checkbox.checked) {
            alert_class.classList.add('z');
            voting.classList.remove('z');
      } else {
        alert("Read the instructions and click on the check box before continuing.");
      }
}

const logged_in_user = document.querySelector("#voter-id");
logged_in_user.textContent = user;
document.getElementById('log-out-btn').addEventListener('click',function(){
      location.replace("../index.html");});
var vote = document.getElementById("vote-btn");
const firebaseConfig1 = {
      apiKey: "AIzaSyBEwJV2zhRCCGZgEo_39dC1dhr_Vgu45r4",
      authDomain: "voting-log.firebaseapp.com",
      databaseURL: "https://voting-log-default-rtdb.firebaseio.com",
      projectId: "voting-log",
      storageBucket: "voting-log.appspot.com",
      messagingSenderId: "84061766566",
      appId: "1:84061766566:web:0edc65e7c19340eca94567",
      measurementId: "G-5RNWGZDY34"
};
var app1 = firebase.initializeApp(firebaseConfig1, "app1");
var firebaseRef1 = app1.database();
var temp,b,c;
firebaseRef1.ref('voter/'+user+"/flag").on("value", function(snapshot){
      temp = snapshot.val();
});
firebaseRef1.ref('vote_count').on("value",function(snapshot){
      t = snapshot.child('tmc').val();
      b = snapshot.child('bjp').val();
      c = snapshot.child('cong').val();
});
vote.addEventListener("click", function(){
      if(temp==="F"){
            var tmc = document.getElementById("tmc");
            var bjp = document.getElementById("bjp");
            var cong = document.getElementById("cong");
            if (tmc.checked) {
                  firebaseRef1.ref('vote_count').update({tmc:(t+1)});
                  var data={
                      voter:user,flag:"T"
                  }
                  firebaseRef1.ref('voter').child(""+user).update(data);
                  alert("Successfully Voted");
                  location.reload();
            }
            else if (bjp.checked) {
                  firebaseRef1.ref('vote_count').update({bjp:(b+1)});
                  var data={
                      voter:user,flag:"T"
                  }
                  firebaseRef1.ref('voter').child(""+user).update(data);
                  alert("Successfully Voted");
                  location.reload();
            }
            else if (cong.checked) {                  
                  firebaseRef1.ref('vote_count').update({cong:(c+1)});
                  var data={
                      voter:user,flag:"T"
                  }
                  firebaseRef1.ref('voter').child(""+user).update(data);
                  alert("Successfully Voted");
                  location.reload();
            }
            else {alert("No option selected. Select ONE Party to vote.");}}
      else{alert("Already Voted. Cannot vote again.");
            location.reload();}
});