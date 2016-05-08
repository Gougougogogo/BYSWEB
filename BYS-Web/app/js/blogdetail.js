angular.module('app.blog').controller('blogDetailController', ['$scope', '$http', '$uibModal', '$state', '$stateParams', function ($scope, $http, $uibModal,$state, $stateParams) {
    $scope.ItemId = $stateParams.blogTypeId;
    $scope.Items = 0;
    $scope.currentPage = 1;
    $scope.itemCountPerPage = 20;
    $scope.blogItems;

    $scope.publishNew = function () {
        $state.go('app.blog.newpost', { blogTypeId: $stateParams.blogTypeId });
    };

    function getBlogPage () {
        $http.get('../Blog/GetItemsCount', {
            params: {
                itemId: $stateParams.blogTypeId
            }
        }).success(function (e) {
            if (e.success) {
                $scope.Items = e.retData;
            }
        });
    };

    function getBlogItems() {
        $.ajax({
            url: "../Blog/GetItems",
            method: 'Get',
            dataType: 'json',
            cache: false,
            data: {
                itemId: $stateParams.blogTypeId,
                page: $scope.currentPage
            },
            success: function (e) {
                if (e.success) {
                    $scope.blogItems = e.retData;
                    $scope.$apply();
                }
            },
            error: function (e) {
                layer.msg(e.retData);
            }
        });
    }

    getBlogPage();
    getBlogItems();

    $scope.openDetail = function (Id) {
        var modalBarInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/views/blog-detail.tpl.html',
            controller: 'blogDetailDialogController',
            // position via css class
            windowClass: 'modal-right modal-auto-size',
            backdropClass: '',
            // sent data to the modal instance (injectable into controller)
            resolve: {
                data: function () {
                    return {
                        blogId: Id
                    };
                }
            }
        });

        modalBarInstance.result.then(function ( /*data*/) {
            // use data from modal here
        }, function () {
            // Modal dismissed
        });
    };
}]);

angular.module('app.blog').controller('blogDetailDialogController', ['$uibModalInstance', 'data', '$http', '$scope', '$timeout', function ($uibModalInstance, data, $http, $scope, $timeout) {

    $scope.blogContent;

    function hightLight() {
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    }

    function getContent() {
        $http.get('../Blog/GetBlogContent', {
            params: {
                blogId: data.blogId
            }
        })
        .success(function (e) {
            $scope.blogContent = e.retData;
            $timeout(function () {
                hightLight();
            }, 100);
        });
    }

    getContent();
    
    $scope.close = function () {
        $uibModalInstance.dismiss();
    };

    $scope.test = function () {
        hightLight();
    }
}])
.filter(
'to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);