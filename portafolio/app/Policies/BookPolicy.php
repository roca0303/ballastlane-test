<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Book;

class BookPolicy
{
    /**
     * Any authenticated user can create a book.
     */
    public function create(User $user): bool
    {
        return $user !== null;
    }

    /**
     * Only the user who created the book or a superAdmin can update.
     */
    public function update(User $user, Book $book): bool
    {
        return $user->id === $book->user_id || $user->hasRole('superAdmin');
    }

    /**
     * Only the user who created the book or a superAdmin can delete.
     */
    public function delete(User $user, Book $book): bool
    {
        return $user->id === $book->user_id || $user->hasRole('superAdmin');
    }
}
