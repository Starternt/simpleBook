'use strict';

// Register `bookList` component, along with its associated controller and template
angular.module('bookList').component('bookList', {
    templateUrl: 'book-list/book-list.template.html',
    controller: ['$http', function BookListController($http) {
        var self = this;
        self.orderProp = 'name';

        // $http.get('bookslist').then(function (response) {
        //     // console.log(response.data);
        //     // self.books = JSON.stringify(response.data);
        //     // self.books = response.data;
        // });
    }]
});

var app = angular.module('bookList');

// directive for uploading files
app.directive("fileInput", function ($parse) {
    return {
        link: function ($scope, element, attrs) {
            element.on("change", function (event) {
                var files = event.target.files;
                // console.log(files[0].name);
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    }
});

//main controller
app.controller('ListCtrl', function ($scope, $http, $route) {
    $scope.books = [];
    var errors = false; //validation form on server
    $scope.uploadFile = function (answerForm) {
        errors = false;
        var form_data = new FormData();
        angular.forEach($scope.files, function (file) {
            form_data.append('file', file);
        });
        var tmpObj = {};

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
                $scope.books.push(book);

                angular.extend(tmpObj, $scope.books);
                $scope.books.length = 0;
                angular.extend($scope.books, tmpObj);

                $http.post('addbook', book).then(function (response) {
                    $scope.errors = response.data;
                    errors = response.data;
                    console.log(errors);
                });
                $http.get('bookslist').then(function (response) {
                    $scope.books.length = 0;
                    angular.extend($scope.books, response.data.data);
                });
            }
        } else {
            alert("RED ALERT! WRONG FORMAT!");
        }

        form_data.data = $scope.files['0'];
        console.log(form_data.data.name);
        if (error == 'png' || error == 'jpg' || error == 'jpeg' || error == 'gif') {
            $http.post('upload/' + form_data.data.name, form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then(function (response) {
                console.log(errors);
                if (!errors) {
                    $route.reload();
                }
                $scope.select();
            });
        }
    };
    $scope.select = function () {
        $http.get("../../public/book-list/select.php")
            .then(function (data) {
                $scope.images = data;
            });
    };

    $scope.regexp = '\\d{4}';
    $http.get('bookslist').then(function (response) {
        $scope.books = response.data.data;
        items_count = Object.keys($scope.books).length; // pagination counter
        $scope.data = items_count;
    });

    //Pagination
    var items_count = 0;
    for (var key in $scope.books) {
        items_count = items_count + 1;
    }
    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.data / $scope.pageSize);
    };

    $scope.removeBook = function (id) {
        console.log($scope.testing);

        $http.get('remove/' + id);
        $http.get('bookslist').then(function (response) {
            $scope.books = response.data.data;
            $route.reload();
        });
    }
});

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

