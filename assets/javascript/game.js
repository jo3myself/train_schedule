var name="";
var dest="";
var time="";
var freq="";

var config = {
    apiKey: "AIzaSyABbLySOkdTZnevdyAH4U__lmRn7VKNrgA",
    authDomain: "train-schedule-f52a4.firebaseapp.com",
    databaseURL: "https://train-schedule-f52a4.firebaseio.com",
    projectId: "train-schedule-f52a4",
    storageBucket: "train-schedule-f52a4.appspot.com",
    messagingSenderId: "679309112522"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", ".submit",function(){
	 event.preventDefault();
    name = $(".trainName").val().trim();
    dest = $(".destination").val().trim();
    time = $(".firstTime").val().trim();
    freq = $(".frequency").val().trim();

    database.ref().push({
      name: name,
      dest: dest,
      time: time,
      freq: freq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });    
});

function data(){
$(".train").empty();
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    var trainData = snapshot.val();
    var trainName=trainData.name;
    var trainDest=trainData.dest;
    var trainTime=moment(trainData.time, "hh:mm");
    var trainFreq=trainData.freq;
    var convert=(moment().diff(trainTime, "minutes"));
    var minAway = parseInt(trainFreq) - (parseInt(convert) % parseInt(trainFreq));
    var nextArrival = moment(moment().add(minAway, "minutes")).format("hh:mm");

    var myrow=$("<tr>");
    myrow.append("<td>" + trainName + "</td>" );
    myrow.append("<td>" + trainDest + "</td>" );
    myrow.append("<td>" + trainFreq + "</td>" );
    myrow.append("<td>" + nextArrival + "</td>" );
    myrow.append("<td>" + minAway + "</td>" );
    $(".train").prepend(myrow);
    $(".trainName").val("");
    $(".destination").val("");
    $(".firstTime").val("");
    $(".frequency").val("");
});
}

data();
setInterval(data, 1000*60);