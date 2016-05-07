angular.module('app.bbs').controller('bbsDetailController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    $scope.url = $stateParams.bbsId;

    $scope.detail;

    $scope.replys = [];

    $scope.init = function () {
        var load = layer.load(0);
        $.ajax({
            url: "../BBS/GetBBSDetail",
            method: 'Get',
            dataType: 'json',
            cache: false,
            data: {
                ID: $stateParams.bbsId
            },
            success: function (e) {
                if (e.success) {
                    $scope.detail = e.retData;
                    $scope.$apply();
                    $('pre code').each(function (i, block) {
                        hljs.highlightBlock(block);
                    });
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

        $.ajax({
            url: "../BBS/GetReplyInfos",
            type: 'Get',
            data: { Id: $stateParams.bbsId },
            cache: false,
            success: function (e) {
                if (e.success) {
                    if (e.retData > 0) {
                        $scope.showReply = true;
                        $scope.$apply();
                        pageCount = Math.floor(e.retData / 10);
                        pageCount = e.retData % 10 == 0 ? pageCount : pageCount + 1;

                        $('#pagination').twbsPagination({
                            totalPages: pageCount,
                            visiblePages: 5,
                            onPageClick: function (event, page) {
                                currentPage = page;
                                getReply(page);
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

    $scope.showReply = false;

    var currentPage = 1;

    function initTinymce() {
        tinymce.init({
            selector: "textarea",

            theme: "modern",

            thieme_url: "/themes/modern/theme.min.js",

            plugins: 'link image code codesample table textcolor emoticons colorpicker autolink advlist lists charmap print preview  fullscreen hr anchor pagebreak spellchecker wordcount',

            external_plugins: {

            },

            add_unload_trigger: false,

            toolbar: "insertfile undo redo |styleselect fontsizeselect bold italic size | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons table codesample",

            height: "500px",

            image_advtab: true,

            image_caption: true,

            relative_urls: false,

            style_formats: [
                { title: 'Bold text', format: 'h1' },
                { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                { title: 'Example 1', inline: 'span', classes: 'example1' },
                { title: 'Example 2', inline: 'span', classes: 'example2' },
                { title: 'Table styles' },
                { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
            ],
            menu: {

            },
            skin: "custom",

            templates: [
                { title: 'Some title 1', description: 'Some desc 1', content: '<strong class="red">My content: {$username}</strong>' },
                { title: 'Some title 2', description: 'Some desc 2', url: 'development.html' }
            ],

            fontsize_formats: "8pt 9pt 10pt 11pt 12pt 26pt 36pt",

            setup: function (ed) {

            },

            spellchecker_callback: function (method, data, success) {
                if (method == "spellcheck") {
                    var words = data.match(this.getWordCharPattern());
                    var suggestions = {};

                    for (var i = 0; i < words.length; i++) {
                        suggestions[words[i]] = ["First", "second"];
                    }

                    success({ words: suggestions, dictionary: true });
                }

                if (method == "addToDictionary") {
                    success();
                }
            }
        });
    };
    function getLanguage(inputs) {
        if (inputs.length) {
            inputs = inputs.replace(/class="language-markup"/g, 'class="language-html"');
            return inputs;
        }
    }
    function validateRequest() {

        if (tinymce.activeEditor.getContent() == '') {
            layer.msg('The reply content is required');
            return false;
        }
        return true;
    }
    function getReply(page) {
        $.ajax({
            url: "../BBS/GetReplyDetails",
            type: 'Get',
            data: { Id: $stateParams.bbsId, Page: currentPage },
            cache: false,
            success: function (e) {
                if (e.success) {
                    $scope.replys = e.retData;
                    $scope.$apply();
                    $('pre code').each(function (i, block) {
                        hljs.highlightBlock(block);
                    });
                }
                else {
                    layer.msg(e.retData);
                }
            },
            error: function (e) {
                layer.msg(e.retData);
            }
        });

    }

    initTinymce();

    var common = {};

    common.htmlEncode = function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&namp;");
        s = s.replace(/</g, "&nlt;");
        s = s.replace(/>/g, "&ngt;");
        //s = s.replace(/ /g, "&nbsp;");
        //s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&nquot;");
        return s;
    }
    common.htmlDecode = function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&namp;/g, "&");
        s = s.replace(/&nlt;/g, "<");
        s = s.replace(/&ngt;/g, ">");
        //s = s.replace(/&nbsp;/g, " ");
        //s = s.replace(/'/g, "\'");
        s = s.replace(/&nquot;/g, "\"");
        //s = s.replace(/<br>/g, "\n");
        return s;
    };

    $scope.publishReply = function () {
        if (validateRequest()) {
            var content = tinymce.activeEditor.getContent();
            content = getLanguage(content);

            var requestData = {
                Id: $scope.url,
                replyContent: common.htmlEncode(content),
            };

            $.ajax({
                url: "../BBS/SubmitReply",
                type: 'POST',
                data: requestData,
                success: function (e) {
                    if (e.success) {
                        layer.msg('Submit reply successfully!');
                        location.reload();
                    }
                    else {
                        layer.msg(e.retData);
                    }
                },
                error: function (e) {
                    layer.msg(e.retData);
                }
            });
        }
    };

}]).filter(
    'to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
}]);