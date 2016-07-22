'use strict';

  
angular.module('po10tial.controllers',['po10tial.services'])

.controller('tmrControl', function($scope, $stateParams, $timeout, Exercises) {
    $scope.exercises = Exercises.all();
    $scope.exercise = $scope.exercises[$stateParams.exerciseId];
    
    var timerValue = 10;
    var totalSecs = "seconds";
    if (timerValue == 1) {
      totalSecs = "second";
    }
    var totalReps = 0;
    $scope.currentSecs = totalSecs;
    $scope.timerValue = timerValue;
    $scope.totalSecs = totalSecs;
    $scope.myTimer = timerValue;
    $scope.radius = 90;
    $scope.totalReps = totalReps;
    var visibilities = ["display: inline-block", "display: none"];
    $scope.startButtonVisibility = visibilities[0];
    $scope.stopButtonVisibility = visibilities[1];

    var myTimerVariable;

    $scope.myCustomTimer = function() {
      $scope.myTimer--;
      if ($scope.myTimer == 1) {
        $scope.currentSecs = "second";
      } else {
        $scope.currentSecs = "seconds";
      }

      if($scope.myTimer == 0) {
        $scope.totalReps++;
        $scope.reset();
        //$timeout.cancel(myTimerVariable);
        //complete(true);
      }
        myTimerVariable = $timeout($scope.myCustomTimer, 1000);
    }

    $scope.start = function() {
      myTimerVariable = $timeout($scope.myCustomTimer, 1000);
      $scope.startButtonVisibility = visibilities[1];
      $scope.stopButtonVisibility = visibilities[0];
    };

    $scope.stop = function() {    
      $timeout.cancel(myTimerVariable);
      $scope.startButtonVisibility = visibilities[0];
      $scope.stopButtonVisibility = visibilities[1];
      //complete(false);
    };
    $scope.reset = function() {
      $scope.myTimer = timerValue;
    }

    var complete = function(forcefulAbort) {
      if(!forcefulAbort){
        alert("You killed the damn timer");      
      } else {
        alert("Timer completed!");
      }
    }

    $scope.getStyle = function(){
                  var transform = 'translateY(-50%) translateX(-50%)';
                  return {
                      'top': '50%',
                      'bottom': 'auto',
                      'left': '50%',
                      'transform': transform,
                      '-moz-transform': transform,
                      '-webkit-transform': transform,
                      'font-size': $scope.radius/3.5 + 'px'
                  };
              };

  })

.controller('exercisesCtrl', function($scope, $stateParams, Exercises) {
    $scope.exercises = Exercises.all();

    $scope.exerciseListItem = {
      name: '',
      id: $scope.exercises.length
    };

    $scope.addExerciseListItem = function(exerciseListItem) {
      $scope.exercises.push({
        name: $scope.exerciseListItem.name,
        id:  $scope.exercises.length
      });

      $scope.exercisesListItem = {
        name: ''
      };

      Exercises.save($scope.exercises);
    };

    $scope.deleteExerciseListItem = function(index) {
      $scope.exercises.splice(index, 1);
      Exercises.save($scope.exercises);
    }



  })

.controller('exerciseCtrl', function($scope, $stateParams, Exercises) {
    
    $scope.exercises = Exercises.all();
    $scope.exercise = $scope.exercises[$stateParams.exerciseId];
    $scope.sets = [{id: 1, date: "7/20/2016", weight: 50, reps: 3}, {id: 2, date: "7/20/2016", weight: 50, reps: 2}, {id: 3, date: "7/20/2016", weight: 50, reps: 1}]
    });