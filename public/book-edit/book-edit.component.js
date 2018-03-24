'use strict';

// Register `bookDetail` component, along with its associated controller and template
angular.module('bookEdit').component('bookEdit', {
    templateUrl: 'book-edit/book-edit.template.html',
    controller: ['$http', '$routeParams',
        function BookEditController($http, $routeParams) {
            var self = this;

            $http.get('book/' + $routeParams.bookId).then(function (response) {
                console.log(response.data['0']['id']);
                self.books = response.data;
            });
        }
    ]
});

var pd = angular.module('bookEdit');
pd.controller('DetailCtrl', function ($scope, $http, $routeParams, $location) {
    var self = this;
    $scope.regexp = '\\d{4}';

    $http.get('book/' + $routeParams.bookId).then(function (response) {
        console.log(response.data['0']['name']);
        self.books = response.data;
        $scope.id = response.data['0']['id'];
        $scope.name = response.data['0']['name'];
        $scope.author = response.data['0']['author'];
        $scope.publish_year = response.data['0']['publish_year'];
        $scope.description = response.data['0']['description'];
        $scope.image = response.data['0']['image'];
    });

    $scope.editBook = function () {
        $scope.errors = true;
        var book = {
            id: $scope.id,
            name: $scope.name,
            author: $scope.author,
            publish_year: $scope.publish_year,
            description: $scope.description
        };

        $http.post('update', book).then(function (response) {
            $scope.errors = response.data;
            $location.path('/books');
        });
    }
});
