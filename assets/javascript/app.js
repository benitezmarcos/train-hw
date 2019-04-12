// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQPT19L38WUj6WUBz-gVjzi1RJmy0KMRI",
  authDomain: "train-schedule-18563.firebaseapp.com",
  databaseURL: "https://train-schedule-18563.firebaseio.com",
  projectId: "train-schedule-18563",
  storageBucket: "train-schedule-18563.appspot.com",
  messagingSenderId: "718520917311"
};
firebase.initializeApp(config);
console.log(firebase);

var database = firebase.database();
var connectionsref = database.ref();

//Initial Values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";


// Capture Button Click
$('#newTrainBtn').on('click', function () {
  event.preventDefault();

  var trainName = $('#trainNameInput').val().trim();
  var destination = $('#destInput').val().trim();
  var firstTrain = $('#firstTrainInput').val().trim();
  var frequency = $('#freqInput').val().trim();

  // // Creates local "temporary" object for holding train data
  // var newTrain = {
  //   name: trainName,
  //   dest: destination,
  //   first: firstTrain,
  //   freq: frequency
  // }

  //Uploads employee data to the database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    //firebase.database.ServerValue.TIMESTAMP
  });
  var newRow = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(destination),
    $('<td>').text(firstTrain),
    $('<td>').text(frequency),

  )
  $('#trainTable > tbody').append(newRow)
});
// Creates a Firebase event for adding trains to the database and a row in the html
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  // Clears all of the text-boxes
  $('#trainNameInput').val("");
  $('#destInput').val("");
  $('#firstTrainInput').val("");
  $('#freqInput').val("");

  return false;
})


//this part gave me a lot of trouble...

//First time
var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current time
var currentTime = moment();
console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

// Difference between times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Mins until train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

