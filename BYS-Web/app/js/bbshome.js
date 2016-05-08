angular.module('app.bbs').controller('bbsHomeController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.questions = [];

    $scope.currentPage = 1;
    $scope.pageCount = 1;

    function getBBSContent(page) {
        var load = layer.load(0);
        $.ajax({
            url: "../BBS/RequestQuestionList",
            method: 'Get',
            dataType: 'json',
            cache: false,
            data: {
                page: page
            },
            success: function (e) {
                if (e.success) {
                    $scope.questions = e.retData;
                    $scope.$apply();
                }
                else {
                    layer.msg(e.retData);
                }
                layer.close(load);
            },
            error: function (e) {
                layer.msg(e.retData);
                layer.close(load);
            }
        });
    }
    //getBBSContent(1);
    $scope.init = function () {
        getBBSContent(1);

        $http.get('../BBS/GetBBSQuestionPageCount', {
            params: {
                pagecount : 10
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