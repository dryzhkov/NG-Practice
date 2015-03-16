(function() {
  var app = angular.module("githubViewer");
  
  var UserController = function($scope, github, $routeParams) {
    var onSuccess = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepoSuccess, onError);
    };

    var onError = function(reason) {
      $scope.error = "Unable to fetch data";
    };

    var onRepoSuccess = function(data) {
      $scope.user.repos = data;
    }

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = "-stargazers_count";
    github.getUser($scope.username).then(onSuccess, onError);
    
    
  }
  app.controller("UserController", UserController);
}());