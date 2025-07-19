<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Support\Facades\Auth;

class BookService
{
    /**
     * Create a new book and associate with the authenticated user.
     */
    public function create(array $data): Book
    {
        $data['user_id'] = Auth::id();
        return Book::create($data);
    }

    /**
     * Update an existing book.
     */
    public function update(Book $book, array $data): Book
    {
        $book->update($data);
        return $book;
    }

    /**
     * Delete a book.
     */
    public function delete(Book $book): void
    {
        $book->delete();
    }
} 