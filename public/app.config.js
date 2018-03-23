'use strict';

angular.
  module('bookApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/books', {
          template: '<book-list></book-list>'
          // controller: 'TestCtrl'
        }).
        when('/books/:bookId', {
          template: '<book-detail></book-detail>'
        }).
        when('/edit/:bookId', {
            template: '<book-edit></book-edit>'
        }).
          when('/search/:data', {
            template: '<book-search></book-search>'
        }).
        otherwise('/books');
    }
  ]);
