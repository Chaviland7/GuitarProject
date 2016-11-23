/*var ScalesApp = angular.module("ScalesApp",[]);
ScalesApp.controller("ScalesController", function($scope) {
  $scope.testing = 42;
});*/

var my_canvas = document.getElementById("canvas");
my_canvas.height = 600;
my_canvas.width = 550;
var context = my_canvas.getContext("2d");

var pent_first_minor = [[[2,1,1,1,1,2],[0,0,0,0,0,0],[0,1,2,1,0,0],[1,0,0,0,1,1]],"First Form Minor Pentatonic Scale"];
var pent_second_minor = [[[0,1,2,1,0,0],[1,0,0,0,1,1],[0,0,0,1,0,0],[1,1,1,0,2,1]],"Second Form Minor Pentatonic Scale"];
var pent_third_minor = [[[1,1,1,0,2,1],[0,0,0,0,0,0],[1,2,1,1,0,1],[0,0,0,0,1,0]],"Third Form Minor Pentatonic Scale"];
var pent_fourth_minor = [[[1,2,1,1,0,1],[0,0,0,0,1,0],[0,0,1,2,0,0],[1,1,0,0,1,1]],"Fourth Form Minor Pentatonic Scale"];
var pent_fifth_minor = [[[0,0,1,2,0,0],[1,1,0,0,1,1],[0,0,0,0,0,0],[2,1,1,1,1,2]],"Fifth Form Minor Pentatonic Scale"];

var scales = [pent_first_minor,pent_second_minor,pent_third_minor,pent_fourth_minor,pent_fifth_minor];

$('.create_scale').click(function() {
  var scale = scales[Math.floor(Math.random() * scales.length)];
  $('#ScaleName').html(scale[1]);
  context.clearRect(0, 0, canvas.width, canvas.height);
  /* Draw Strings! */
  for (var string = 6; string > 0; string--) {
    context.beginPath();
    context.moveTo((string*100-100)+25,0);
    context.lineTo((string*100-100)+25,600);
    context.stroke();
  }
  /* Draw Frets! */
  for (var fret = 0; fret < 5; fret++) {
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
});
