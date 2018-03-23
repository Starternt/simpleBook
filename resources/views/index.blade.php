<!DOCTYPE html>
<html ng-app="bookApp">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('bower_components/bootstrap/dist/css/bootstrap.css')}} "/>
    <link rel="stylesheet" href="{{asset('app.css')}}"/>
    <script src="{{asset('pace.min.js')}}"></script>
    <link href="{{asset('pace-theme-barber-shop.css')}}" rel="stylesheet"/>
    <script src="{{asset('bower_components/angular/angular.js')}}"></script>
    <script src="{{asset('bower_components/angular-route/angular-route.js')}}"></script>
    <script src="{{asset('app.module.js')}}"></script>
    <script src="{{asset('app.config.js')}}"></script>
    <script src="{{asset('core/core.module.js')}}"></script>
    <script src="{{asset('core/checkmark/checkmark.filter.js')}}"></script>
    <script src="{{asset('book-list/book-list.module.js')}}"></script>
    <script src="{{asset('book-list/book-list.component.js')}}"></script>
    <script src="{{asset('book-detail/book-detail.module.js')}}"></script>
    <script src="{{asset('book-detail/book-detail.component.js')}}"></script>
    <script src="{{asset('book-edit/book-edit.module.js')}}"></script>
    <script src="{{asset('book-edit/book-edit.component.js')}}"></script>
    <script src="{{asset('book-search/book-search.module.js')}}"></script>
    <script src="{{asset('book-search/book-search.component.js')}}"></script>
    <script src="https://rawgithub.com/gsklee/ngStorage/master/ngStorage.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"
            integrity="sha384-I6F5OKECLVtK/BL+8iSLDEHowSAfUo76ZL9+kGAgTRdiByINKJaqTPH/QVNS1VDb"
            crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>
<div ng-view></div>
</body>
</html>