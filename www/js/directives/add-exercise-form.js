'use strict';
angular.module('po10tial')

.directive('addExerciseForm', function() {
  return {
    restrict: 'E',
    scope: {
      'onSubmit': '&'
    },
    link: function($scope, $element, $attr) {
      $scope.submit = function() {
        $scope.formAddExercise.$attempt = true;

        if ($scope.formAddExercise.$valid) {
          $scope.onSubmit({ exercise: $scope.name });
        }
      };

      $scope.$on('modal.hidden', function() {
        // Clear form
        $scope.favorite = null;
        $scope.formAddExercise.$attempt = false;
        $scope.formAddExercise.$setPristine(true);
      });
    },
    templateUrl: 'templates/directives/add-exercise-form.html'
  };
});
