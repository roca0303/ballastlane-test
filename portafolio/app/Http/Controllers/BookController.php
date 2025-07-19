<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Services\BookService;

class BookController extends Controller
{
    /**
     * Display a listing of books (public route).
     */
    public function index()
    {
        // Return all books using a resource collection
        return BookResource::collection(Book::all());
    }

    /**
     * Store a newly created book (authenticated users only).
     */
    public function store(StoreBookRequest $request, BookService $bookService)
    {
        $this->authorize('create', Book::class);
        $book = $bookService->create($request->validated());
        return new BookResource($book);
    }

    /**
     * Display the specified book (public route).
     */
    public function show($id)
    {
        $book = Book::findOrFail($id);
        return new BookResource($book);
    }

    /**
     * Update the specified book (only creator or superAdmin).
     */
    public function update(UpdateBookRequest $request, $id, BookService $bookService)
    {
        $book = Book::findOrFail($id);
        $this->authorize('update', $book);
        $book = $bookService->update($book, $request->validated());
        return new BookResource($book);
    }

    /**
     * Remove the specified book (only creator or superAdmin).
     */
    public function destroy($id, BookService $bookService)
    {
        $book = Book::findOrFail($id);
        $this->authorize('delete', $book);
        $bookService->delete($book);
        return response()->json(['message' => 'Book deleted successfully']);
    }
}
