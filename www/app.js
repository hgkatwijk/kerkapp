
angular.
module('hgkatwijk-kerkapp', []).

config(['$httpProvider', function($httpProvider) {

}]).

controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.jsonp('http://kerkapp.hgkatwijk.nl/api/v1/upcoming.php?callback=JSON_CALLBACK').success(function(data) {
    var sermons = data;


    $scope.sermonsByDay = {};
    var sermon;
    var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    var days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var dayparts = ["Ochtend", "Middag", "Avond"];

    for (var i = 0; i < sermons.length; i++) {
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
        dayparts: {}
      };
      $scope.sermonsByDay[sermon.date].dayparts[sermon.time] = $scope.sermonsByDay[sermon.date].dayparts[sermon.time] || {
        daypart: dp,
        sermons: {}
      };

      $scope.sermonsByDay[sermon.date].dayparts[sermon.time].sermons[sermon.nid] = sermon;
    }

  });

}]);
