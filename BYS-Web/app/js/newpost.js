angular.module('app.bbs').controller('NewPostController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    var attchmentsList = [];
    var common = {};
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

    function validateRequest() {
        if ($scope.title == '') {
            layer.msg('The question title is required');
            return false;
        }
        if ($scope.title.length > 250) {
            layer.msg('The question title accepte most 250 characters)');
            return false;
        }
        if (tinymce.activeEditor.getContent() == '') {
            layer.msg('The question description is required');
            return false;
        }
        return true;
    }

    function initFileUploader() {
        var i = 1,
        dropzone_filetable = $("#attachmentsList"),
        my_dropzone = $("#advancedDropzone").dropzone({
            url: '../BBS/UploadAttachments',
            maxFilesize: 20,
            // Events
            addedfile: function (file) {
                if (i == 1) {
                    dropzone_filetable.find('tbody').html('');
                }
                var size = parseInt(file.size / 1024, 10);
                size = size < 1024 ? (size + " KB") : (parseInt(size / 1024, 10) + " MB");

                var $el = $('<tr>\
							<td class="text-center">'+ (i++) + '</td>\
							<td>'+ file.name + '</td>\
							<td><div class="progress progress-striped"><div class="progress-bar progress-bar-warning"></div></div></td>\
							<td>'+ size + '</td>\
							<td>Uploading...</td>\
						</tr>');

                dropzone_filetable.find('tbody').append($el);
                file.fileEntryTd = $el;
                file.progressBar = $el.find('.progress-bar');
            },
            accept: function (file, done) {
                if (file.size > 20978018) {
                    layer.msg('Error: File size exceed 20MB.');
                    done('File size exceed');
                }
                else {
                    done();
                }
            },
            success: function (file, retData) {
                var size = parseInt(file.size / 1024, 10);
                size = size < 1024 ? (size + " KB") : (parseInt(size / 1024, 10) + " MB");
                attchmentsList.push({ FileName: retData.serverFileName, FileSize: size });
                file.fileEntryTd.find('td:last').html('<span class="text-success">Uploaded</span>');
                file.progressBar.removeClass('progress-bar-warning').addClass('progress-bar-success');
            },
            uploadprogress: function (file, progress, bytesSent) {
                file.progressBar.width(progress + '%');
            },
            error: function (file, error) {
                if (file.accept) {
                    file.fileEntryTd.find('td:last').html('<span class="text-danger">Failed</span>');
                    file.progressBar.removeClass('progress-bar-warning').addClass('progress-bar-red');
                }
                else {
                    file.fileEntryTd.find('td:last').html('<span class="text-danger">' + error + '</span>');
                    file.progressBar.removeClass('progress-bar-warning').addClass('progress-bar-red');
                }
            }
        });
    }

    function getLanguage(inputs) {
        if (inputs.length) {
            inputs = inputs.replace(/class="language-markup"/g, 'class="language-html"');
            return inputs;
        }
    }
    
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

    $scope.title = '';

    $scope.tags = [];

    $scope.selectedTags = 'Automation,C#,MVC';

    initTinymce();

    initFileUploader();

    $scope.publish = function () {

        if (!validateRequest()) {
            return;
        }

        var content = tinymce.activeEditor.getContent();
        content = getLanguage(content);
        var requestData = {
            title: $scope.title,
            tags: $scope.selectedTags,
            bbsContent: common.htmlEncode(content),
            attachments: JSON.stringify(attchmentsList)
        };
        $.ajax({
            url: "../BBS/RequestPublish",
            type: 'POST',
            data: requestData,
            success: function (e) {
                if (e.success) {
                    $state.go('app.bbs.detail', { bbsId: e.retData });
                }
                else {
                    layer.msg(e.retData);
                }
            },
            error: function (e) {
                layer.msg(e.retData);
            }
        });
    };
}]);