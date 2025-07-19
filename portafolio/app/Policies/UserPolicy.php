<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can create users.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('superAdmin');
    }

    /**
     * Determine whether the user can update users.
     */
    public function update(User $user): bool
    {
        return $user->hasRole('superAdmin');
    }

    /**
     * Determine whether the user can delete users.
     */
    public function delete(User $user): bool
    {
        return $user->hasRole('superAdmin');
    }
} 