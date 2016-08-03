'use strict';

  
angular.module('po10tial.controllers',['po10tial.services'])

.controller('tmrControl', function($scope, $stateParams, $timeout, Exercises, $ionicNavBarDelegate) {
    
     $ionicNavBarDelegate.showBackButton(true);

    var workoutDate = new Date();
    $scope.workoutDateYear = workoutDate.getFullYear();
    $scope.workoutDateMonth = workoutDate.getMonth();
    $scope.workoutDateDay = workoutDate.getDay();
    
    $scope.exercises = Exercises.all();
    $scope.exercise = $scope.exercises[$stateParams.exerciseId];
    if(!$scope.exercise.sets) {
        $scope.exercise.sets = [];
    }
    
    var timerValue = 10;
    var totalSecs = "seconds";
    var weight = $scope.weight;
    if (timerValue == 1) {
        totalSecs = "second";
    }
    var totalReps = 0;
    $scope.timerStarted = false;
    $scope.savetheSet = false;
    $scope.currentSecs = totalSecs;
    $scope.timerValue = timerValue;
    $scope.totalSecs = totalSecs;
    $scope.myTimer = timerValue;
    $scope.radius = 90;
    $scope.totalReps = totalReps;

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
        }
        myTimerVariable = $timeout($scope.myCustomTimer, 1000);
    }

    $scope.start = function() {
        myTimerVariable = $timeout($scope.myCustomTimer, 1000);
        $scope.timerStarted=true;
        $scope.savetheSet=false;

    };

    $scope.stop = function() {    
        $timeout.cancel(myTimerVariable);
        $scope.timerStarted=false;
        $scope.savetheSet=true;
    };
    $scope.set = {
        date: $scope.workoutDate,
        weight: 0
    }
    $scope.saveSet = function () {
        $scope.exercise.sets.push({
            id: $scope.exercise.sets.length,
            date: $scope.workoutDate,
            reps: totalReps,
            weight: $scope.set.weight
        });
        Exercises.save($scope.exercises);
    }
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



.controller('exerciseCtrl', function($scope, $stateParams, Exercises, $ionicNavBarDelegate) {
    
     $ionicNavBarDelegate.showBackButton(true);
    
    $scope.exercises = Exercises.all();
    $scope.exercise = $scope.exercises[$stateParams.exerciseId];
    $scope.sets = $scope.exercise.sets;
    /*$scope.sets = function () {
        if ($scope.exerice.sets) {
            return $scope.exercise.sets;
        } else {
            return [];
        }
    }*/
    //$scope.sets = [{id: 1, date: "7/20/2016", weight: 50, reps: 3}, {id: 2, date: "7/20/2016", weight: 50, reps: 2}, {id: 3, date: "7/20/2016", weight: 50, reps: 1}]
    });