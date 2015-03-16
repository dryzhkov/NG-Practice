(function() {
  var app = angular.module("githubViewer");
  var MainController = function($scope, $interval, $location, $log) {
    var countdownInterval = null;
    var decrementCountdown = function() {
      $scope.countdown--;
      if ($scope.countdown < 1) {
        $scope.username = "angular";
        $scope.search($scope.username);
      }
    };

    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
      }
      $location.path("/user/" + username)
    };

    $scope.countdown = 5;
    startCountdown();
  }
  app.controller("MainController", ["$scope", "$interval", "$location", "$log", MainController]);
}());