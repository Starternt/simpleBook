'use strict';

// Register `bookDetail` component, along with its associated controller and template
angular.module('bookDetail').component('bookDetail', {
    templateUrl: 'book-detail/book-detail.template.html',
    controller: ['$http', '$routeParams',
        function BookDetailController($http, $routeParams) {
            var self = this;

            $http.get('book/' + $routeParams.bookId).then(function (response) {
                console.log(response.data);
                self.books = response.data;
            });
        }
    ]
});
