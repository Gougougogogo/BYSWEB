angular.module('app.bbs').controller('bbsHomeController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.questions = [];

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
    };

    $scope.gotoDetail = function (id) {
        $state.go('app.bbs.detail', { bbsId: id });
    };

}]);