'use strict'
angular.module('po10tial')

.controller('exercisesCtrl', function($scope, $stateParams, $ionicListDelegate, Exercises) {
    $scope.exercises = Exercises.all();

    $scope.exerciseListItem = {
      //name: '',
      id: $scope.exercises.length
    };

    $scope.addExerciseListItem = function(exerciseListItem) {
      $scope.exercises.push({
        name: $scope.exerciseListItem.name,
        muscleGroup: $scope.exerciseListItem.muscleGroup,
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
    $scope.editExerciseListItem = function (exerciseName) {
        //alert(exerciseName);
        $scope.inlineExerciseListItem = {
            name: exerciseName,
            word: /^\s*\w*\s*$/
        };
        $ionicListDelegate.$getByHandle('exercise-list').closeOptionButtons();        
    }
    $scope.updateExerciseListItem = function(index, exerciseName) {
        $scope.exercises[index].name = exerciseName;
        Exercises.save($scope.exercises);
    }
    
  });