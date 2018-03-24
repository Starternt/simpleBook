'use strict';

// Register `bookList` component, along with its associated controller and template
angular.module('bookList').component('bookList', {
    templateUrl: 'book-list/book-list.template.html',
    controller: ['$http', function BookListController($http) {
        var self = this;
        self.orderProp = 'name';
    }]
});

var app = angular.module('bookList');

// directive for uploading files
app.directive("fileInput", function ($parse) {
    return {
        link: function ($scope, element, attrs) {
            element.on("change", function (event) {
                var files = event.target.files;
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    }
});

//main controller
app.controller('ListCtrl', function ($scope, $http, $route) {
    $scope.data = {};
    $scope.data.books = null;
    var errors = false; //validation file format
    $scope.regexp = '\\d{4}';

    $http.get('bookslist').then(function (response) {
        $scope.data.books = response.data.data;
        items_count = Object.keys($scope.data.books).length; // pagination counter
        $scope.data_amount = items_count;
    });

    $scope.uploadFile = function (answerForm) {
        errors = false;
        var form_data = new FormData();
        angular.forEach($scope.files, function (file) {
            form_data.append('file', file);
        });

        var file_name = $scope.files['0'].name;
        var error = file_name.split('.');
        error = error[error.length - 1];

        if (error == 'png' || error == 'jpg' || error == 'jpeg' || error == 'gif') {
            if (answerForm.$valid) {
                $scope.errors = false;
                var book = {
                    name: $scope.name,
                    author: $scope.author,
                    publish_year: $scope.publish_year,
                    description: $scope.description,
                    image: file_name
                };
                $scope.name = "";
                $scope.author = "";
                $scope.publish_year = "";
                $scope.description = "";
                $scope.answerForm.$setUntouched();

                $http.post('addbook', book).then(function (response) {
                    $scope.errors = response.data;
                    // if (response.data.success == 'success') {
                    //     $scope.data.books[$scope.data.books.length] = book;
                    // }
                });
            }
        } else {
            alert("RED ALERT! WRONG FORMAT!");
        }

        form_data.data = $scope.files['0'];
        if (error == 'png' || error == 'jpg' || error == 'jpeg' || error == 'gif') {
            $http.post('upload/' + form_data.data.name, form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then(function (response) {
                $scope.data.books[$scope.data.books.length] = book;
            });
        }
    };

    //Pagination
    var items_count = 0;
    for (var key in $scope.books) {
        items_count = items_count + 1;
    }
    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.data_amount / $scope.pageSize);
    };

    $scope.removeBook = function (id) { //или получить элемент по айди и удалить
        $http.get('remove/' + id).then(function () {
            $http.get('bookslist').then(function (response) {
                $scope.data.books = response.data.data;
            });
        });
    }
});

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

