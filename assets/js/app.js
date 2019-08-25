
const config = {
    apiKey: "AIzaSyC8vGi0ocyrTQ_wT6rGIqP4A82yYIY_apE",
    authDomain: "train-timer-471cb.firebaseapp.com",
    databaseURL: "https://train-timer-471cb.firebaseio.com",
    projectId: "train-timer-471cb",
    storageBucket: "train-timer-471cb.appspot.com",
    messagingSenderId: "553375562440",
    appId: "1:553375562440:web:ae17d5f43a8a6590"
};
// Initialize Firebase
firebase.initializeApp(config);

console.log(firebase);

// Create a variable to reference the database.
var trainData = firebase.database();

$("#newTrainBtn").on("click", function () {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    console.log("Train added!");

    //clear boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
    return false;
})

//on child added update
trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;
    //remainder
    var remainder = moment().diff(moment().unix(firstTrain), "minutes") % frequency;
    //minutes
    var minutes = frequency - remainder;
    //arrival
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

  //append to table
    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><tr>");
  
  });//end on child added function
  