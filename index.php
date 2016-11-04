<html>
  <head>
    <meta charset="utf-8">
		<title>Guitar | Home</title>

		<!-- Le styles -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> <!-- Get JQuery -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> <!-- Angular -->

		<link rel="stylesheet" type="text/css" href="style.css"> <!-- Get my CSS -->
		<link rel="shortcut icon" href="">

		<meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script>
      $(document).ready(function() {
        $('button.show_results').click(function(){
          $('#NoteResults').css('display','block');
        });
        $('button.start_progression').click(function(){
          $(this).css('display','none');
          $('#ChordProgression').css('display','block');
          var chords = ['A','B','C','D','E','F','G'];
          var positions = ['Bar 6','Bar 5','Open']
          var chord, lastcord;
          setInterval(function() {
            chord = chords[Math.floor(Math.random() * 6)];
            position = positions[Math.floor(Math.random() * 3)];
            $('#ChordProgression').text(position+' '+chord);
          },
          3500); // every 1 second
        });
      });
    </script>
    <script>
      var NotesApp = angular.module("NotesApp", []);

      NotesApp.controller("NotesController", function($scope) {
        $scope.string = 3;
        $scope.fret = 5;
      });
    </script>
  </head>
  <body>
    <?php
      $server = 'localhost';
      $user = 'root';
      $pass = 'root';
      $dbname = 'guitar';
      $connection = new mysqli($server, $user, $pass);
      if ($connection->connect_error) {
        die('Connect Error (' . $connection->connect_errno . ') '. $connection->connect_error);
      }
      $db = mysqli_select_db($connection, $dbname);
      function display_number($num) {
        return ($num == 1) ? '1st' : (($num == 2) ? '2nd' : (($num == 3) ? '3rd' : $num.'th'));
      }
      function display_string($string_num) {
        return display_number($string_num).' String';
      }
      function display_fret($fret_num) {
        return ($fret_num == 0) ? 'Open' : display_number($fret_num).' Fret';
      }
    ?>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Guitar Project</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#Home">Home<span class="sr-only">(current)</span></a></li>
            <li><a href="#StringsNotes">Strings & Notes</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <div class="col-md-12 front_page" id="Home">
      <h1>Welcome!</h1>
      <hr />
      <h2>Please choose from any of the below activities</h2>
    </div>
    <div data-ng-app="NotesApp" data-ng-controller="NotesController" class="col-md-12 front_page" id="StringsNotes">
      <h1>Strings and Notes</h1>
      <hr />
      <div class="col-md-6">
        <?php
          $query = mysqli_query($connection,'SELECT * FROM string_notes ORDER BY RAND() LIMIT 1');
          while ($row = mysqli_fetch_array($query)) {
            $id = $row["ID"];
            $string = $row["string"];
            $fret = $row["fret"];
            $note = $row["note"];
            echo '<h2>'.display_string($string).' '.display_fret($fret).'</h2>';
          }
        ?>
      </div>
      <div class="col-md-6">
        <input placeholder="Note (Whole or Sharp)"></input>
        <button class="show_results">Check</button>
      </div>
      <div id="NoteResults" class="col-md-12 results">
        <h1 class="correct">Correct!</h1>
      </div>
    </div>
    <div class="col-md-12 front_page" id="Chords">
      <h1>Chord Generator</h1>
      <hr />
      <div class="col-md-12 chords">
        <button class="start_progression">Go!</button>
        <h1 id="ChordProgression">*Chord Progression Here*</h1>
      </div>
    </div>
  </body>
</html>
