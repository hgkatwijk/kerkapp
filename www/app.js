
angular.
module('hgkatwijk-kerkapp', []).

config(['$httpProvider', function($httpProvider) {

}]).

config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider.
  when('/week', {
    templateUrl: 'tpl/week.html',
    controller: 'MainCtrl'
  }).
  when('/item/:itemId', {
    templateUrl: 'tpl/item.html',
    controller: 'ItemCtrl'
  }).
  otherwise({
    redirectTo: '/week'
  });
}]).

controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.
  jsonp('http://kerkapp.hgkatwijk.nl/api/v1/upcoming.php?callback=JSON_CALLBACK').
  success(function(data) {
    var sermons = data;


    $scope.sermonsByDay = {};
    var sermon;
    var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    var days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var dayparts = ["Ochtend", "Middag", "Avond"];

    for (var i in sermons) {
      sermon = sermons[i];
      var d = new Date(sermon.date);
      var dp = parseInt(sermon.time.substr(0, 2), 10);
      if (dp < 12) {
        dp = dayparts[0];
      }
      else if (dp < 18) {
        dp = dayparts[1];
      }
      else {
        dp = dayparts[2];
      }

      $scope.sermonsByDay[sermon.date] = $scope.sermonsByDay[sermon.date] || {
        date: days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()],
        location: {}
      };
      $scope.sermonsByDay[sermon.date].location[sermon.church] = $scope.sermonsByDay[sermon.date].location[sermon.church] || {
        daypart: dp,
        sermons: {}
      };

      $scope.sermonsByDay[sermon.date].location[sermon.church].sermons[sermon.nid] = sermon;
    }

  });

}]).

controller('ItemCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.itemId = $routeParams.itemId;

  $http.
  jsonp('http://kerkapp.hgkatwijk.nl/api/v1/upcoming.php?callback=JSON_CALLBACK').
  success(function(data) {
    var sermons = data;

    var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    var days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var dayparts = ["Ochtend", "Middag", "Avond"];


    $scope.sermon = sermons[$routeParams.itemId];

  });
}]);
