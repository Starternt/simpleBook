<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Check;
use Illuminate\Http\Request;
use App\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $book_item = Book::where('id', '=', $id)->get();
        return json_encode($book_item);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, Check $check)
    {
        $book = new Book;
        $book->name = $request->input('name');
        $book->author = $request->input('author');
        $book->publish_year = $request->input('publish_year');
        $book->description = $request->input('description');
        $book->image = $request->input('image');

        $data['name'] = $request->input('name');
        $data['author'] = $request->input('author');
        $data['publish_year'] = $request->input('publish_year');
        $data['description'] = $request->input('description');
        $errors = $check->checkData($data);

        if ($errors['success'] == 'false') {
            return json_encode($errors);
        }
        $book->save();

        return $errors;
    }


    public function search(Request $request)
    {
        $name = $request->input('name');
        $author = $request->input('author');
        $books = Book::where('name', 'LIKE', "%$name%")->orWhere('author', 'LIKE', "%$author%")->get();

        return response()->json(['data' => $books], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $data = Book::all();

        return response()->json(['data' => $data], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $book_item = Book::where('id', '=', $id)->get();
        return $book_item;
    }

    public function upload($name, Request $request)
    {
        $file = $request->file('file');
        $file->move(public_path() . '/images/', "$name");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Check $check)
    {
        $id = $request->input('id');
        $data['name'] = $request->input('name');
        $data['author'] = $request->input('author');
        $data['publish_year'] = $request->input('publish_year');
        $data['description'] = $request->input('description');
        $errors = $check->checkData($data);

        if ($errors['success'] == 'false') {
            return json_encode($errors);
        }
        DB::update('update books set name = ?, author = ?, publish_year = ?, description = ? where id = ?', [$data['name'],
            $data['author'], $data['publish_year'], $data['description'], $id]);

        return $errors;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function remove($id, Book $book)
    {
        $book = Book::where('id', '=', $id)->delete();

        return $id;
    }
}
