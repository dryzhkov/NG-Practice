(function() {
  var app = angular.module("githubViewer", []);
  var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) {
    var onSuccess = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepoSuccess, onError);
    };

    var onError = function(reason) {
      $scope.error = "Unable to fetch data";
    };

    var onRepoSuccess = function(data) {
      $scope.user.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    }

    var decrementCountdown = function() {
      $scope.countdown--;
      if ($scope.countdown < 1) {
        $scope.username = "dryzhkov";
        $scope.search($scope.username);
      }
    };
    var countdownInterval = null;
    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;
    $scope.search = function(username) {
      if(countdownInterval){
        $interval.cancel(countdownInterval);
      }
      $log.info("Searching for " + username);
      github.getUser(username).then(onSuccess, onError);
    };

    startCountdown();
  }
  app.controller("MainController", ["$scope", "github", "$interval", "$log", "$anchorScroll", "$location", MainController]);
}());