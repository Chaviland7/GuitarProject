<!DOCTYPE html>
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
        jQuery(function() {
				  jQuery('a[href*="#"]:not([href="#"])').click(function() {
				    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				      var target = jQuery(this.hash);
				      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
				      if (target.length) {
				        jQuery('html, body').animate({
				          scrollTop: target.offset().top - 300
				        }, 1000);
				        return false;
				      }
				    }
				  });
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
        $('body').scrollspy({target:'#navbar',offset:300});
      });
    </script>
  </head>
  <body>
    <nav class="navbar navbar-default navbar-fixed-top">
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

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="nav navbar-nav" role="tablist">
            <li class="active"><a href="#Home">Home</a></li>
            <li><a href="#StringsNotes">Strings & Notes</a></li>
            <li><a href="#Chords">Chords</a></li>
            <li><a href="#Scales">Scales</a></li>
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
        <h2>{{string+' - '+fret}}</h2>
        <h2>Streak: {{streak}}</h2>
      </div>
      <div class="col-md-6">
        <input id="NoteGuess" placeholder="Note (Whole or Sharp)" data-ng-model="guess">
        <button class="generate_note">Start</button>
        <button class="show_results">Check</button>
      </div>
      <div id="NoteResults" class="col-md-12 results">
        <h1 class="{{class()}}">{{output()}}</h1>
        <button class="continue">Continue</button>
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
    <div class="col-md-12 front_page" id="Scales">
      <h1>Name That Scale</h1>
      <hr />
      <div class="col-md-12 scale">
        <button class="create_scale">Go!</button>
      </div>
      <div class="col-md-6">
        <canvas height="600" width="500" id="canvas">Test Text</canvas>
      </div>
      <div class="col-md-6">
        <h1 id="ScaleName">testing</h1>
      </div>
    </div>
    <script type='text/javascript' src='drawing.js'></script>
    <script type='text/javascript' src='notesController.js'></script>
  </body>
</html>
