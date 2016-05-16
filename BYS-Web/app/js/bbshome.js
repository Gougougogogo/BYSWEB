angular.module('app.bbs').controller('bbsHomeController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.questions = [];

    $scope.currentPage = 1;
    $scope.pageCount = 1;
    $scope.itemperPage = 10;
    $scope.searchPatten = '';

    function getBBSContent(page) {
        var load = layer.load(0);
        $http.get('../BBS/RequestQuestionList', {
            cache: false,
            params: {
                page: page
            }
        }).success(function (e) {
            if (e.success) {
                if (e.retData) {
                    $scope.questions = e.retData;
                }
                layer.close(load);
            }
        }).error(function (e) {
            layer.msg(e.retData);
            layer.close(load);
        });
    }
    
    $scope.init = function () {
        getBBSContent(1);

        $http.get('../BBS/GetBBSQuestionPageCount', {
            cache :false,
            params: {
                pagecount: $scope.itemperPage,
            }
        }).success(function (e) {
            if (e.success) {
                if (e.retData > 0) {
                    $scope.pageCount = e.retData;
                }
            }
        }).error(function (e) {
            layer.msg(e.retData);
        });
    }

    $scope.init();

    $scope.search = function () {
        //$http.get('../BBS/GetSearchResult', {
        //    cache : false,
        //    params: {
        //        keyword: $scope.searchPatten
        //    }
        //}).success(function (e) {
        //    if (e.success) {
        //        var a = e.retData;
        //    }
        //}).error(function (e) {
        //    layer.msg(e.retData);
        //});
    };

    $scope.gotoDetail = function (id) {
        $state.go('app.bbs.detail', { bbsId: id });
    };

    $scope.quickReply = function (id) {
        layer.msg('function is on implementing.')
    };

    $scope.pageChanged = function () {
        getBBSContent($scope.currentPage);
    };
}]);