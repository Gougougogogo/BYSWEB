angular.module('app.blog').controller('blogHomeController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

    $scope.bolgTypes;


    $http.get('../Blog/GetBlogTypes').success(function (e) {
        $scope.bolgTypes = e.retData;
    })
    .error(function (e) {
        layer.msg(e.retData);
    });

    $scope.viewDetail = function (Id) {
        $state.go('app.blog.detail', { blogTypeId: Id });
    };

    $scope.mark = function (Id) {
        layer.msg('Function is on implementing');
    };
}]);