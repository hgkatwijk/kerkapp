
angular.
module('hgkatwijk-kerkapp', ['ngRoute', 'ngTouch', 'ngAnimate']).

config(['$sceDelegateProvider', function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://diensten.hgkatwijk.nl/**'
  ]);
}]).

config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  var now = new Date();
  var onejan = new Date(now.getFullYear(),0,1);
  var currentWeekNr = Math.ceil((((now - onejan) / 86400000) + onejan.getDay()+1)/7);

  $routeProvider.
  when('/week/:weekNr', {
    templateUrl: 'tpl/week.html',
    controller: 'MainCtrl'
  }).
  when('/item/:itemId', {
    templateUrl: 'tpl/item.html',
    controller: 'ItemCtrl'
  }).
  otherwise({
    redirectTo: '/week/' + currentWeekNr
  });
}]).

filter('toArray', function () {
  return function (obj) {
    if (!(obj instanceof Object)) {
      return obj;
    }

    return Object.keys(obj).map(function (key) {
      return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
    });
  };
}).

controller('MainCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
  var weekNr;
  if ($routeParams.weekNr) {
    weekNr = $routeParams.weekNr;
  }
  weekNr = parseInt(weekNr, 10);
  if (!weekNr) {
    var now = new Date();
    var onejan = new Date(now.getFullYear(),0,1);
    weekNr = Math.ceil((((now - onejan) / 86400000) + onejan.getDay()+1)/7);
  }

  $scope.curr = weekNr;
  $scope.prev = $scope.curr - 1;
  $scope.next = $scope.curr + 1;

  $scope.gotoWeek = function(week) {
    console.debug('Goto week ' + week);
    $location.path('/week/' + week);
  };
  $scope.gotoItem = function(item) {
    console.debug('Goto item ' + item);
    $location.path('/item/' + item);
  };

  $http.
  jsonp('http://kerkapp.hgkatwijk.nl/api/v1/week.php?week=' + weekNr + '&callback=JSON_CALLBACK').
  success(function(data) {
    var sermons = data;


    $scope.sermonsByDay = {};
    var sermon;
    var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    var days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var dayparts = ["Ochtend", "Middag", "Avond"];

    for (var i=0; i < sermons.length; i++) {
    //for (var i in sermons) {
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
        weight: sermon.weight,
        sermons: {}
      };

      $scope.sermonsByDay[sermon.date].location[sermon.church].sermons[sermon.nid] = sermon;
    }

  });

}]).

controller('ItemCtrl', ['$scope', '$routeParams', '$http', '$window', function($scope, $routeParams, $http, $window) {
  $scope.itemId = $routeParams.itemId;

  $scope.goBack = function() {
    $window.history.back();
  };

  $http.
  jsonp('http://kerkapp.hgkatwijk.nl/api/v1/item.php?item=' + $scope.itemId + '&callback=JSON_CALLBACK').
  success(function(data) {
    var sermons = data;

    $scope.sermon = sermons[$routeParams.itemId];

  });
}]);
