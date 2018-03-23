'use strict';

// Register `bookDetail` component, along with its associated controller and template
angular.module('bookSearch').component('bookSearch', {
    templateUrl: 'book-search/book-search.template.html',
    controller: ['$http', '$routeParams',
        function BookDetailController($http, $routeParams) {
        }
    ]
});

var app = angular.module('bookSearch');

app.controller('SearchCtrl', function ($scope, $http, $routeParams) {
    var query = {
        name: $routeParams.data,
        author: $routeParams.data
    };
    console.log('Name: ' + query.name);
    query = JSON.stringify(query);
    $http.post('search', query).then(function (response) {
        $scope.books = response.data.data;
        items_count = Object.keys($scope.books).length; // pagination counter
        $scope.data = items_count;
    });

    // Pagination
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
            $scope.books = response.data;
            $route.reload();
        });
    }
});
