var my_canvas = document.getElementById("canvas");
my_canvas.height = 900;
my_canvas.width = 550;
var context = my_canvas.getContext("2d");

var pent_first_minor = [[[2,1,1,1,1,2],[0,0,0,0,0,0],[0,1,2,1,0,0],[1,0,0,0,1,1]],"First Form Minor Pentatonic"];
var pent_second_minor = [[[0,1,2,1,0,0],[1,0,0,0,1,1],[0,0,0,1,0,0],[1,1,1,0,2,1]],"Second Form Minor Pentatonic"];
var pent_third_minor = [[[1,1,1,0,2,1],[0,0,0,0,0,0],[1,2,1,1,0,1],[0,0,0,0,1,0]],"Third Form Minor Pentatonic"];
var pent_fourth_minor = [[[1,2,1,1,0,1],[0,0,0,0,1,0],[0,0,1,2,0,0],[1,1,0,0,1,1]],"Fourth Form Minor Pentatonic"];
var pent_fifth_minor = [[[0,0,1,2,0,0],[1,1,0,0,1,1],[0,0,0,0,0,0],[2,1,1,1,1,2]],"Fifth Form Minor Pentatonic"];

var scales = [pent_first_minor,pent_second_minor,pent_third_minor,pent_fourth_minor,pent_fifth_minor];

function createScale(scale) {
  /* Draw Strings! */
  for (var string = 6; string > 0; string--) {
    context.beginPath();
    context.moveTo((string*100-100)+25,0);
    context.lineTo((string*100-100)+25,900);
    context.stroke();
  }
  /* Draw Frets! */
  for (var fret = 0; fret < 7; fret++) {
    context.beginPath();
    context.moveTo(25,150*fret);
    context.lineTo(525,150*fret);
    context.stroke();
  }
  /* Draw Notes! */
  for (var fret = 0; fret < 4; fret++) {
    for (var string = 6; string > 0; string--) {
      if (scale[0][fret][string-1] > 0) {
        context.beginPath();
        context.arc((100*string)-75, (150*fret)+75, 18, 0, 2*Math.PI);
        context.closePath();
        context.fill();
      }
      if (scale[0][fret][string-1] > 1) {
        context.beginPath();
        context.arc((100*string)-75, (150*fret)+75, 24, 0, 2*Math.PI);
        context.stroke();
      }
    }
  }
};

GuitarApp.controller("ScalesController", function($scope) {
  var scale;
  $scope.testing = 42;
  $scope.output = function() {
    if ($scope.guess) {
      if ($scope.guess == scale[1]) {
        return "Correct!";
      }
      else {
        return "Sorry, the answer was: "+scale[1];
      }
    } else {
      return "Please enter a value";
    }
  }
  $scope.class = function() {
    if ($scope.guess) {
      if ($scope.guess == scale[1]) {
        return 'correct';
      }
      else {
        return 'incorrect';
      }
    }
  }
  $scope.streak = 0;
  $('#Scales .show_results').click(function() {
    $('#ScaleResults').toggle();
    $('#ScaleGuess').prop('disabled',true);
    if ($scope.output() != "Correct!") $scope.streak = 0;
    else $scope.streak += 1;
  });

  $('#Scales .create_scale').click(function() {
    $(this).toggle();
    scale = scales[Math.floor(Math.random() * scales.length)];
    $('#ScaleGuess').toggle();
    $('#ScaleGuess').attr("placeholder", scale[1]);
    $('#Scales button.show_results').css('display','block');
    context.clearRect(0, 0, canvas.width, canvas.height);
    createScale(scale);
  });
  $('#Scales button.continue').click(function(){
    $('#ScaleResults').toggle();
    $('#ScaleGuess').toggle();
    $('#Scales button.show_results').toggle();
    $('#Scales button.create_scale').toggle();
    $('#ScaleGuess').prop('disabled',false);
  });
});
