var ScaleCanvas = document.getElementById("ScaleCanvas");
ScaleCanvas.height = 600;
ScaleCanvas.width = 550;
var ScaleContext = ScaleCanvas.getContext("2d");

var pent_first_minor = [[[2,1,1,1,1,2],[0,0,0,0,0,0],[0,1,2,1,0,0],[1,0,0,0,1,1]],"First Form Minor Pentatonic"];
var pent_second_minor = [[[0,1,2,1,0,0],[1,0,0,0,1,1],[0,0,0,1,0,0],[1,1,1,0,2,1]],"Second Form Minor Pentatonic"];
var pent_third_minor = [[[1,1,1,0,2,1],[0,0,0,0,0,0],[1,2,1,1,0,1],[0,0,0,0,1,0]],"Third Form Minor Pentatonic"];
var pent_fourth_minor = [[[1,2,1,1,0,1],[0,0,0,0,1,0],[0,0,1,2,0,0],[1,1,0,0,1,1]],"Fourth Form Minor Pentatonic"];
var pent_fifth_minor = [[[0,0,1,2,0,0],[1,1,0,0,1,1],[0,0,0,0,0,0],[2,1,1,1,1,2]],"Fifth Form Minor Pentatonic"];

var minor_scales = [pent_first_minor,pent_second_minor,pent_third_minor,pent_fourth_minor,pent_fifth_minor];

var pent_first_major = [[[0,1,1,1,0,0],[2,0,0,0,1,2],[0,0,0,1,0,0],[1,1,2,0,1,1]],"First Form Major Pentatonic"];
var pent_second_major = [[[1,1,2,0,1,1],[0,0,0,0,0,0],[1,1,1,1,0,1],[0,0,0,0,2,0]],"Second Form Major Pentatonic"];
var pent_third_major = [[[1,1,1,1,0,1],[0,0,0,0,2,0],[0,0,1,1,0,0],[1,2,0,0,1,1]],"Third Form Major Pentatonic"];
var pent_fourth_major = [[[0,0,1,1,0,0],[1,2,0,0,1,1],[0,0,0,0,0,0],[1,1,1,2,1,1]],"Fourth Form Major Pentatonic"];
var pent_fifth_major = [[[1,1,1,2,1,1],[0,0,0,0,0,0],[0,1,1,1,0,0],[2,0,0,0,1,2]],"Fifth Form Major Pentatonic"];

var major_scales = [pent_first_major, pent_second_major, pent_third_major, pent_fourth_major, pent_fifth_major];

var scales = minor_scales.concat(major_scales);

function createScale(scale_name) {
  var jsScale;
  scales.forEach(function(scale) {
    if (scale_name == scale[1]) {
      jsScale = scale;
    }
  });
  /* Draw Strings! */
  for (var string = 6; string > 0; string--) {
    ScaleContext.beginPath();
    ScaleContext.moveTo((string*100-100)+25,0);
    ScaleContext.lineTo((string*100-100)+25,600);
    ScaleContext.stroke();
  }
  /* Draw Frets! */
  for (var fret = 0; fret < 5; fret++) {
    ScaleContext.beginPath();
    ScaleContext.moveTo(25,150*fret);
    ScaleContext.lineTo(525,150*fret);
    ScaleContext.stroke();
  }
  /* Draw Notes! */
  for (var fret = 0; fret < 4; fret++) {
    for (var string = 6; string > 0; string--) {
      if (jsScale[0][fret][string-1] > 0) {
        ScaleContext.beginPath();
        ScaleContext.arc((100*string)-75, (150*fret)+75, 18, 0, 2*Math.PI);
        ScaleContext.closePath();
        ScaleContext.fill();
      }
      if (jsScale[0][fret][string-1] > 1) {
        ScaleContext.beginPath();
        ScaleContext.arc((100*string)-75, (150*fret)+75, 24, 0, 2*Math.PI);
        ScaleContext.stroke();
      }
    }
  }
};

GuitarApp.controller("ScalesController", function($scope, $http) {
  var scale;
  $scope.output = function() {
    if ($scope.guess) {
      if ($scope.guess == $scope.scale_name) {
        return "Correct!";
      }
      else {
        return "Sorry, the answer was: "+$scope.scale_name;
      }
    } else {
      return "Please enter a value";
    }
  }
  $scope.class = function() {
    if ($scope.guess) {
      if ($scope.guess == $scope.scale_name) {
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
    $('#ScaleGuess').toggle();
    $('#Scales button.show_results').css('display','block');
    $http.get("scales.php").then(function (response) {
      var rows = response.data.records;
      rows.forEach(function(row) {
        $scope.ID = row.ID;
        $scope.scale_name = row.Scale_Name;
        createScale($scope.scale_name);
      });
    });
  });
  $('#Scales button.continue').click(function(){
    $('#ScaleResults').toggle();
    $('#ScaleGuess').toggle();
    $('#Scales button.show_results').toggle();
    $('#Scales button.create_scale').toggle();
    $('#ScaleGuess').prop('disabled',false);
    ScaleContext.clearRect(0, 0, TriadCanvas.width, TriadCanvas.height);
  });
});
