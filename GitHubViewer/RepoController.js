(function() {
  var app = angular.module("githubViewer");
  var RepoController = function($scope, github, $routeParams, $log) {
    var onRepoInfoSuccess = function(data) {
      $scope.repodetails = data;
    };

    var onContributorsSuccess = function(data) {
      $scope.repodetails.repocontributors = data;
    };

    var onError = function(reason) {
      $scope.error = reason;
    };

    var username = $routeParams.username;
    var reponame = $routeParams.reponame;
    $scope.contributorsSortOrder = "+login"

    github.getRepoInfo(username, reponame).then(onRepoInfoSuccess, onError);
    github.getContributors(username, reponame).then(onContributorsSuccess, onError);

  };



  app.controller("RepoController", RepoController);
}());