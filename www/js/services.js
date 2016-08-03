angular.module('po10tial.services', ['ionic'])

/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Exercises', function($http) {
  return {
    all: function() {
      var exercisesString = window.localStorage['exercises'];
      if (exercisesString) {
        return angular.fromJson(exercisesString);
      }
      return [];
    },
    save: function(exercises) {
      console.log(exercises);
      var exercisesJSON = {
        exercisesJSON: exercises
      };
      console.log(exercisesJSON);
      $http.post("http://boldallies.com/cgi-bin/api.php", exercisesJSON)
      
      .success(function (data, status, headers, config) {
          console.log("Data:" + data + ", headers: " + headers);
          //, status: " + status + ", headers: " + headers + ", config: " + config);
      });
      //window.localStorage['exercises'] = angular.toJson(exercises);
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

.factory('Exercise', function($http, exercises, set) {
    return {
        save: function (set) {
            window.localStorage['exercises'] = angular.toJson(exercises);
        }
    }
})