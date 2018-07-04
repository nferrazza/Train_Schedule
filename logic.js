  // firebase script
  var config = {
    apiKey: "AIzaSyBSopO6UioRB-TSm5gzAL3_1c5I7CL2gLo",
    authDomain: "train-times-8f3f7.firebaseapp.com",
    databaseURL: "https://train-times-8f3f7.firebaseio.com",
    projectId: "train-times-8f3f7",
    storageBucket: "",
    messagingSenderId: "339751227509"
  };


  firebase.initializeApp(config);
  //firebase ref
  

  //var to ref database
  var database = firebase.database();

  //initial values
  var trainName = "";
  var trainDest = "";
  var firstTrain = "";
  var frequency = "";
//   
  //submit button-click
  $("#add-train").on("click", function(event){
      //stops refresh
      event.preventDefault();

      //variables now equal the input values
      trainName = $("#name-input").val().trim();
      trainDest = $("#destination-input").val().trim();
      firstTrain = $("#firstTrain-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      

      //check to see inputs
      console.log(trainName);
      console.log(trainDest);
      console.log(firstTrain);
      console.log(frequency);


      //pushes response to database
      database.ref().push({
          trainName : trainName,
          trainDest : trainDest,
          firstTrain : firstTrain,
          frequency : frequency
      });

  });

  database.ref().on("child_added", function (snapshot){

    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().trainDest);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    trainName = snapshot.val().trainName;
    trainDest = snapshot.val().trainDest;
    firstTrain = snapshot.val().firstTrain;
    frequency = snapshot.val().frequency;

    var timeNow = moment().format("hh:mm");
    console.log("CURRENT TIME: " + timeNow);

    var firstTimeConverted = moment (firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // var minutesAway = ;
    
    var tN = $("#tN");
    var tD = $("#tD");
    var f = $("#f");
    var nA = $("#nA");
    var mA = $("#mA");

    tN.append(trainName + "<br>");
    tD.append(trainDest + "<br>");
    f.append(frequency + "<br>");
    nA.append(nextTrain.format("hh:mm") + "<br>");
    mA.append(tMinutesTillTrain + "<br>");
    

  });


var currentTime = moment();
var clock = $("#clock");
clock.text("Current Time:  " + (currentTime).format("hh:mm"));
console.log((currentTime).format("hh:mm"));

var span = document.getElementById('span');

function time() {
  var d = new Date();
  var s = d.getSeconds(":ss");
  var m = d.getMinutes(":mm");

  if (d.getHours() > 12 ){
    var h = d.getHours()-12;
  }
  
  else {
    var h = d.getHours();
  }
  span.textContent = "Current Time: "  + h + ":" + m + ":" + s;
}

setInterval(time, 1000);


