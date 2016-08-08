'use strict'
angular.module('po10tial')

.controller('exercisesCtrl', function($scope, $stateParams, $ionicListDelegate, Exercises, $ionicNavBarDelegate) {
    
    $ionicNavBarDelegate.showBackButton(false);

      var exercisesVar = Exercises.all(); 
      
        /*console.log("exerciseResponse = " + exercisesVar);
        if (exercisesVar) {
          console.log("exercisesVar = " + exercisesVar);
          //resolve(exerciseResponse);
        } else {
          //reject();
        }*/
      
      exercisesVar.then(function(fromResolve) {
        console.log("exercises returned - " + fromResolve);

        //$scope.exercises = getExercises();
        //console.log($scope.exercises);
        //var allExercises = "";
        /*while (allExercises === "") {
          console.log(allExercises);
          getExercises(allExercises);      
        };*/
        $scope.exercises = fromResolve;
          
        $scope.exerciseListItem = {
          //name: '',
          id: $scope.exercises.length
        };

        $scope.addExerciseListItem = function(exerciseListItem) {
          if ($scope.exercises[$scope.exercises.length]) {
            return false;
          }
          $scope.exercises.push({
            name: $scope.exerciseListItem.name,
            muscleGroup: $scope.exerciseListItem.muscleGroup,
            id: $scope.exercises.length,
              sets: []
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
        
        $scope.editExerciseListItem = function (exerciseName, muscleGroup) {
            //alert(exerciseName);
            $scope.inlineExerciseListItem = {
                name: exerciseName,
                muscleGroup: muscleGroup,
                word: /^\s*\w*\s*$/
            };
            $ionicListDelegate.$getByHandle('exercise-list').closeOptionButtons();        
        }
        $scope.updateExerciseListItem = function(index, exerciseName, muscleGroup) {
            $scope.exercises[index].name = exerciseName;
            $scope.exercises[index].muscleGroup = muscleGroup;
            Exercises.save($scope.exercises);
        }
        
        $scope.toggleGroup = function(group) {
          if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
          } else {
            $scope.shownGroup = group;
          }
        };
        $scope.isGroupShown = function(group) {
          return $scope.shownGroup === group;
        };
        
      })
      .catch(function(fromReject) {
        console.log("No exercises returned - " + fromReject);
      })
    
  });