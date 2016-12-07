var TriadCanvas = document.getElementById("TriadCanvas");
TriadCanvas.height = 600;
TriadCanvas.width = 600;
var TriadContext = TriadCanvas.getContext("2d");
var fret_num;


var first_form_major_triad = {notes: [[0,0,0,0,0,0],[0,0,0,0,1,2],[0,0,0,1,0,0]],type: "Triad",name: 'First Form Major Triad',root_string: 1,root_fret: 2};
var fourth_form_major_triad = {notes: [[0,0,0,0,0,1],[0,0,0,0,0,0],[0,0,0,2,1,0]],type: "Triad",name: 'Fourth Form Major Triad',root_string: 3,root_fret: 3};
var d_form_major_triad = {notes: [[0,0,0,1,0,1],[0,0,0,0,2,0],[0,0,0,0,0,0]],type: "Triad",name: 'D Form Major Triad',root_string: 2,root_fret: 2};
var first_form_major_triad_2 = {notes: [[0,0,0,0,1,0],[0,0,0,1,0,0],[0,0,2,0,0,0]],type: "Triad",name: 'First Form Major Triad',root_string: 4,root_fret: 3};
var fourth_form_major_triad_2 = {notes: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,1,2,1,0]],type: "Triad",name: 'Fourth Form Major Triad',root_string: 3,root_fret: 3};
var d_form_major_triad_2 = {notes: [[0,0,0,1,0,0],[0,0,0,0,2,0],[0,0,1,0,0,0]],type: "Triad",name: 'D Form Major Triad',root_string: 2,root_fret: 2};
var major_triads = [first_form_major_triad,fourth_form_major_triad,d_form_major_triad,first_form_major_triad_2,fourth_form_major_triad_2,d_form_major_triad_2];

var first_form_minor_triad = {notes: [[0,0,0,1,1,2],[0,0,0,0,0,0],[0,0,0,0,0,0]],type: "Triad",name: 'First Form Minor Triad',root_string: 1,root_fret: 1};
var fourth_form_minor_triad = {notes: [[0,0,0,0,0,1],[0,0,0,0,1,0],[0,0,0,2,0,0]],type: "Triad",name: 'Fourth Form Minor Triad',root_string: 3,root_fret: 3};
var d_form_minor_triad = {notes: [[0,0,0,0,0,1],[0,0,0,1,0,0],[0,0,0,0,2,0]],type: "Triad",name: 'D Form Minor Triad',root_string: 2,root_fret: 3};
var first_form_minor_triad_2 = {notes: [[0,0,0,1,1,0],[0,0,0,0,0,0],[0,0,2,0,0,0]],type: "Triad",name: 'First Form Minor Triad',root_string: 4,root_fret: 3};
var fourth_form_minor_triad_2 = {notes: [[0,0,0,0,0,0],[0,0,0,0,1,0],[0,0,1,2,0,0]],type: "Triad",name: 'Fourth Form Minor Triad',root_string: 3,root_fret: 3};
var d_form_minor_triad_2 = {notes: [[0,0,0,1,0,0],[0,0,1,0,2,0],[0,0,0,0,0,0]],type: "Triad",name: 'D Form Minor Triad',root_string: 2,root_fret: 2};
var minor_triads = [first_form_minor_triad,fourth_form_minor_triad,d_form_minor_triad,first_form_minor_triad_2,fourth_form_minor_triad_2,d_form_minor_triad_2];

var triads = major_triads.concat(minor_triads);

var first_form_power_chord = {notes: [[2,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,0,0,0]],type: "Power Chord",name: 'First Form Power Chord',root_string: 6,root_fret: 1};
var fourth_form_power_chord = {notes: [[0,2,0,0,0,0],[0,0,0,0,0,0],[0,0,1,1,0,0]],type: "Power Chord",name: 'Fourth Form Power Chord',root_string: 5,root_fret: 1};
var power_chords = [first_form_power_chord,fourth_form_power_chord];

var all_chords = triads.concat(power_chords);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function pickTriad(chord_name) {
  fret_num = getRandomInt(1,12);
  var jsTriad;
  all_chords.forEach(function(chord) {
    if (chord_name == chord.name) {
      jsTriad = chord;
    }
  });
  return jsTriad;
}
function drawTriad(triad) {
  /* Draw Strings! */
  for (var string = 6; string > 0; string--) {
    TriadContext.beginPath();
    TriadContext.moveTo((string*100-100)+75,0);
    TriadContext.lineTo((string*100-100)+75,600);
    TriadContext.stroke();
  }
  /* Draw Frets! */
  for (var fret = 0; fret < 4; fret++) {
    TriadContext.beginPath();
    TriadContext.moveTo(75,200*fret);
    TriadContext.lineTo(575,200*fret);
    TriadContext.stroke();
  }
  /* Draw Notes! */
  for (var fret = 0; fret < 3; fret++) {
    for (var string = 6; string > 0; string--) {
      if (triad.notes[fret][string-1] > 0) {
        TriadContext.beginPath();
        TriadContext.arc((100*string)-25, (200*fret)+100, 18, 0, 2*Math.PI);
        TriadContext.closePath();
        TriadContext.fill();
      }
      if (triad.notes[fret][string-1] > 1) {
        TriadContext.beginPath();
        TriadContext.arc((100*string)-25, (200*fret)+100, 24, 0, 2*Math.PI);
        TriadContext.stroke();
      }
    }
    TriadContext.font="35px Georgia";
    TriadContext.fillText(fret_num+fret,20,200*fret+105);
  }
}

//hitting enter submits the request
document.getElementById("TriadFormGuess").addEventListener("keyup", function(event) {event.preventDefault();if (event.keyCode == 13) {document.getElementById("SubmitTriadGuess").click();}});
document.getElementById("TriadRootGuess").addEventListener("keyup", function(event) {event.preventDefault();if (event.keyCode == 13) {document.getElementById("SubmitTriadGuess").click();}});

GuitarApp.controller("TriadsController", function($scope, $http) {
  var triad;
  $scope.output = function() {
    if ($scope.form_guess && $scope.root_guess) {
      if (($scope.form_guess == $scope.form) && ($scope.root_guess == $scope.root)) {//both right
        return "Correct!";
      }
      else if ($scope.form_guess == $scope.form) {//right form
        return "Sorry, the root was: "+$scope.root;
      }
      else if ($scope.root_guess == $scope.root) {//right root
        return "Sorry, the form was: "+$scope.form;
      }
      else {//both wrong
        return "Sorry, the form was: "+$scope.form+" and the root was: "+$scope.root;
      }
    } else {
      return "Please enter a value";
    }
  }
  $scope.class = function() {
    if ($scope.form_guess && $scope.root_guess) {
      if (($scope.form_guess == $scope.form) && ($scope.root_guess == $scope.root)) {
        return 'correct';
      }
      else {
        return 'incorrect';
      }
    }
  }
  $scope.streak = 0;
  $('#Triads .show_results').click(function() {
    $('#TriadResults').toggle();
    $('#TriadFormGuess').prop('disabled',true);
    $('#TriadRootGuess').prop('disabled',true);
    if ($scope.output() != "Correct!") $scope.streak = 0;
    else $scope.streak += 1;
  });

  $('#Triads .create_triads').click(function() {
    $(this).toggle();
    $('.TriadContainer').toggle();
    $('#Triads button.show_results').css('display','block');
    var chosen_one = all_chords[Math.floor(Math.random()*all_chords.length)];
    var triad = pickTriad(chosen_one.name);
    $scope.form = chosen_one.name;
    var request = $http({
      method: "post",
      url: "triads.php",
      data: {
        root_string: triad.root_string,
        root_fret: triad.root_fret+fret_num-1
      },
      headers: {"Access-Control-Allow-Origin":"*", "Content-Type": "application/json; charset=UTF-8"}
    });
    request.success(function (data) {
      $scope.root = data.records.Note;
      drawTriad(triad);
    });
  });
  $('#Triads button.continue').click(function(){
    $('#TriadResults').toggle();
    $('.TriadContainer').toggle();
    $('#Triads button.show_results').toggle();
    $('#Triads button.create_triads').toggle();
    $('#TriadFormGuess').prop('disabled',false);
    $('#TriadRootGuess').prop('disabled',false);
    TriadContext.clearRect(0, 0, TriadCanvas.width+50, TriadCanvas.height);
  });
});
