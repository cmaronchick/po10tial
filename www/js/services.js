angular.module('po10tial.services', ['ionic'])

/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Exercises', function() {
  return {
    all: function() {
      var exercisesString = window.localStorage['exercises'];
      if (exercisesString) {
        return angular.fromJson(exercisesString);
      }
      return [];
    },
    save: function(exercises) {
      window.localStorage['exercises'] = angular.toJson(exercises);
    },
    newProject: function(exerciseName) {
      // Add a new project
      return {
        title: exerciseName,
        sets: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveExercise']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveExercise'] = index;
    }
  }
})