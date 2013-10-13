
angular.
module('hgkatwijk-kerkapp', []).

config(['$httpProvider', function($httpProvider) {

}]).

controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  /*$http.get('http://kerkapp.hgkatwijk.nl/api/v1/upcoming.php').success(function(data) {
    $scope.sermons = data;
  });*/

  var sermons =
[{
"nid":"9968",
"date":"2013-10-13",
"time":"10:00",
"church":"Nieuwe kerk",
"preacher":"ds. D.J. van Eckeveld"
},
{
"nid":"9969",
"date":"2013-10-13",
"time":"10:00",
"church":"Oude kerk",
"preacher":"ds. Z. de Graaf"
},
{
"nid":"9970",
"date":"2013-10-13",
"time":"10:00",
"church":"Ichthuskerk",
"preacher":"ds. J.B.  Alblas"
},
{
"nid":"9971",
"date":"2013-10-13",
"time":"10:00",
"church":"Pniëlkerk",
"preacher":"ds. J.B. ten Hove"
},
{
"nid":"9972",
"date":"2013-10-13",
"time":"10:00",
"church":"Maranathacentrum",
"preacher":"ds. F.  Wijnhorst"
},
{
"nid":"9973",
"date":"2013-10-13",
"time":"18:00",
"church":"Nieuwe kerk",
"preacher":"ds. F. van den Bosch"
},
{
"nid":"9974",
"date":"2013-10-13",
"time":"18:00",
"church":"Oude kerk",
"preacher":"ds. L. de Wit"
},
{
"nid":"9975",
"date":"2013-10-13",
"time":"18:00",
"church":"Ichthuskerk",
"preacher":"ds. J.  Geene"
},
{
"nid":"9976",
"date":"2013-10-13",
"time":"18:00",
"church":"Pniëlkerk",
"preacher":"ds. B.H.  Weegink"
},
{
"nid":"9977",
"date":"2013-10-13",
"time":"18:00",
"church":"Maranathacentrum",
"preacher":"kand. G.M. van Meijeren"
},
{
"nid":"10881",
"date":"2013-10-13",
"time":"10:00",
"church":"Het Anker",
"preacher":"ds. J.G.  Luinstra"
},
{
"nid":"10882",
"date":"2013-10-13",
"time":"14:30",
"church":"Kapel Overduin",
"preacher":"ds. F. van den Bosch"
},
{
"nid":"10884",
"date":"2013-10-17",
"time":"18:30",
"church":"Kapel De Wilbert",
"preacher":"ds. A.  Christ"
}];

  $scope.sermonsByDay = {};
  var sermon;
  for (var i = 0; i < sermons.length; i++) {
    sermon = sermons[i];

    $scope.sermonsByDay[sermon.date] = $scope.sermonsByDay[sermon.date] || {
      date: sermon.date,
      dayparts: {}
    };
    $scope.sermonsByDay[sermon.date].dayparts[sermon.time] = $scope.sermonsByDay[sermon.date].dayparts[sermon.time] || {
      daypart: sermon.time,
      sermons: {}
    };

    $scope.sermonsByDay[sermon.date].dayparts[sermon.time].sermons[sermon.nid] = sermon;
  }
}]);
