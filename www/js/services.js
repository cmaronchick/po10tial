angular.module('po10tial.services', ['ionic'])

/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Exercises', function($http) {
  return {
    all: function() {
      var exercisesString = $http({
        method: 'GET',
        url: 'http://boldallies.com/cgi-bin/retrieve-exercises.php'
      }).then(function successCallback(response) {        
        console.log("Success");
        if (response.data.exercisesJSON) {
          //console.log("angular.fromJson(response.data.exercisesJSON) = ");
          //console.log(angular.fromJson(response.data.exercisesJSON));
          console.log("exercisesString = ");
          console.log(angular.fromJson(response.data.exercisesJSON));
          return angular.fromJson(response.data.exercisesJSON);
        } else {
          return [];
        }
      }, function errorCallback(response) {
        console.log("errorCallback");
        return window.localStorage['exercises'];
      });
    },
    save: function(exercises) {
      console.log(exercises);
      var exercisesJSON = {
        exercisesJSON: exercises
      };
      console.log(exercisesJSON);
      $http.post("http://boldallies.com/cgi-bin/save-exercises.php", exercisesJSON)
      
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