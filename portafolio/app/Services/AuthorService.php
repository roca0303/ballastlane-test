<?php

namespace App\Services;

use App\Models\Author;
use Illuminate\Support\Facades\Auth;

class AuthorService
{
    /**
     * Create a new author and associate with the authenticated user.
     */
    public function create(array $data): Author
    {
        $data['user_id'] = Auth::id();
        return Author::create($data);
    }

    /**
     * Update an existing author.
     */
    public function update(Author $author, array $data): Author
    {
        $author->update($data);
        return $author;
    }

    /**
     * Delete an author.
     */
    public function delete(Author $author): void
    {
        $author->delete();
    }
} 