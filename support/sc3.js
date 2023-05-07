const enrolled_voters = document.querySelector("#enrolled-voters");
const votes_polled = document.querySelector("#votes_polled");
const percentage_turnout = document.querySelector("#percentage_turnout");
const tmc_count = document.querySelector("#tmc_count");
const tmc_per = document.querySelector("#tmc_per");
const bjp_count = document.querySelector("#bjp_count");
const bjp_per = document.querySelector("#bjp_per");
const inc_count = document.querySelector("#inc_count");
const inc_per = document.querySelector("#inc_per");
var ctx = document.getElementById("pieChart").getContext("2d");
var resetButton = document.getElementById("reset-btn");
var stopSession = document.getElementById("stop-session");

const voter_id = document.querySelector("#voter_id");
const voter_name = document.querySelector("#voter_name");
const aadhaar_no = document.querySelector("#aadhaar_no");
const email_id = document.querySelector("#email_id");
const mob_num = document.querySelector("#mob_num");

let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");
        
menuicn.addEventListener("click",()=>{
  nav.classList.toggle("navclose");
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
var app = firebase.initializeApp(firebaseConfig, "app");
var firebaseRef = app.database();

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
var app1 = firebase.initializeApp(firebaseConfig1,"app1");
var app2 = firebase.initializeApp(firebaseConfig1,"app2");
var firebaseRef1 = app1.database().ref('voter');
var firebaseRef2 = app2.database().ref('vote_count');
var votted;
firebaseRef1.on("value", function(snapshot){
  var voter_arr = [];
  var flag = [];
  var c=0;
  snapshot.forEach(function(element){
      c=voter_arr.push(element.key);
  })
  var i=0;
  snapshot.forEach(function(){
    flag.push(snapshot.child(''+voter_arr[i]).child('flag').val());i++;
  })
  enrolled_voters.textContent=c;
  votted = flag.filter(element => element === "T").length;
  votes_polled.textContent=votted;
  percentage_turnout.textContent=(votted/c).toFixed(4)*100;
  var pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [ "Voters Voted","Did Not Vote"],
        datasets: [
          {
            label: "# of Votes",
            data: [flag.filter(element => element === "T").length, (c-flag.filter(element => element === "T").length)],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)","rgba(255, 99, 132, 0.2)"],
          //   borderColor: [
          //     "rgba(54, 162, 235, 1)","rgba(255, 99, 132, 1)"],
          //   borderWidth: 1
          }
        ]
      }
  });
    var i=0;
    resetButton.addEventListener("click", function() {
      if (votted>0){
        snapshot.forEach(function(){
          var data={
            voter:voter_arr[i],flag:"F"
          }
          firebaseRef1.child(""+voter_arr[i]).update(data);
          i++;
      })}
  })
  stopSession.addEventListener("click", function() {
    var data={
      bjp:0,tmc:0,cong:0
    }
    firebaseRef2.update(data);
  })
});

firebaseRef2.on("value",function(snapshot){
  var tmc = snapshot.child('tmc').val();  
  tmc_count.textContent=tmc;
  tmc_per.textContent=(tmc/votted).toFixed(2)*100;
  var bjp = snapshot.child('bjp').val();  
  bjp_count.textContent=bjp;  
  bjp_per.textContent=(bjp/votted).toFixed(2)*100; 
  var cong = snapshot.child('cong').val();
  inc_count.textContent=cong;
  inc_per.textContent=(cong/votted).toFixed(2)*100;
});

firebaseRef.ref('user').on("value", function(snapshot){
  document.getElementById("searchbtn").addEventListener("click",function(){
      var user = document.getElementById('voter-id').value;
      voter_id.textContent=user;
      var a = snapshot.child(user).child('aadhaar').val();
      aadhaar_no.textContent=a;
      var b = snapshot.child(user).child('email').val();
      email_id.textContent=b;
      var c = snapshot.child(user).child('phone').val();
      mob_num.textContent=c;
  });
});
