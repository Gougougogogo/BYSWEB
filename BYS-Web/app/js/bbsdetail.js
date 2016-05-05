angular.module('app.bbs').controller('bbsDetailController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    $scope.url = $stateParams.bbsId;
}]);