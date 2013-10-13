
angular.
module('hgkatwijk-kerkapp', []).

config(['$httpProvider', function($httpProvider) {

}]).

controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('http://kerkapp.hgkatwijk.nl/api/v1/upcoming.php').success(function(data) {
    $scope.sermons = data;
  });
}]);
