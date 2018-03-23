<?php

Route::get('/', function () {
    return view('index');
});
Route::get('/bookslist', 'BookController@show');
Route::post('/addbook', 'BookController@create');
Route::get('book/{id}', 'BookController@index');
Route::get('edit/{id}', 'BookController@edit');
Route::post('update', 'BookController@update');

Route::get('remove/{id}', 'BookController@remove');
Route::post('search', 'BookController@search');
Route::post('upload/{name}', 'BookController@upload');