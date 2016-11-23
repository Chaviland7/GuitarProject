function display_number(num) {
  if (num == 1) return '1st';
  if (num == '2') return '2nd';
  if (num == '3') return '3rd';
  else return num+'th';
}
function display_string(string_num) {
  return display_number(string_num)+' String';
}
function display_fret(fret_num) {
  if (fret_num == 0) return 'Open';
  else return display_number(fret_num)+' Fret';
}

var NotesApp = angular.module("NotesApp", []);
NotesApp.controller("NotesController", function($scope, $http) {
  $scope.output = function() {
    if ($scope.note == $scope.guess) {
      return 'Correct!';
    }
    else {
      return "Sorry, the answer was "+$scope.note;
    }
  };
  $scope.class = function() {
    if ($scope.note == $scope.guess) {
      return 'correct';
    }
    else {
      return 'incorrect';
    }
  }
  $scope.streak = 0;
  $('.show_results').click(function() {
    $('#NoteResults').toggle();
    if ($scope.output() != "Correct!") $scope.streak = 0;
    else $scope.streak += 1;
  });
  $('.generate_note').click(function() {
    $('button.show_results').css('display','block');
    $('#NoteGuess').css('display','block');
    $(this).toggle();
    $http.get("sequel.php").then(function (response) {
      var rows = response.data.records;
      rows.forEach(function(row) {
        $scope.ID = row.ID;
        $scope.string = display_string(row.String);
        $scope.fret = display_fret(row.Fret);
        $scope.guess = null;
        $scope.note = row.Note;
      });
    });
  });
  $('button.continue').click(function(){
    $('#NoteResults').toggle();
    $('#NoteGuess').toggle();
    $('button.show_results').toggle();
    $('button.generate_note').toggle();
  });
});
