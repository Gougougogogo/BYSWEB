angular.module('app.bbs').controller('bbsHomeController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.questions = [];

    var pageCount = 0;
    var currentPage = 1;

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
        $.ajax({
            url: "../BBS/GetBBSQuestionPageCount",
            type: 'Get',
            data: { pagecount: 10 },
            cache: false,
            success: function (e) {
                if (e.success) {
                    if (e.retData > 0) {
                        pageCount = e.retData;

                        $('#pagination').twbsPagination({
                            totalPages: pageCount,
                            visiblePages: 5,
                            onPageClick: function (event, page) {
                                currentPage = page;
                                getBBSContent(page);
                            }
                        });
                    }
                }
            },
            error: function (e) {
                layer.msg(e.retData);
            }
        });     
    };

    $scope.gotoDetail = function (id) {
        $state.go('app.bbs.detail', { bbsId: id });
    };

    $scope.quickReply = function (id) {
        layer.msg('function is on implementing.')
    };
}]);