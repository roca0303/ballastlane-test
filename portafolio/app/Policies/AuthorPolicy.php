<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Author;

class AuthorPolicy
{
    /**
     * Any authenticated user can create an author.
     */
    public function create(User $user): bool
    {
        return $user !== null;
    }

    /**
     * Only the user who created the author or a superAdmin can update.
     */
    public function update(User $user, Author $author): bool
    {
        return $user->id === $author->user_id || $user->hasRole('superAdmin');
    }

    /**
     * Only the user who created the author or a superAdmin can delete.
     */
    public function delete(User $user, Author $author): bool
    {
        return $user->id === $author->user_id || $user->hasRole('superAdmin');
    }
}
