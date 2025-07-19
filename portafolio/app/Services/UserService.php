<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Create a new user and assign a role.
     */
    public function create(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'milestone' => $data['milestone'] ?? null,
        ]);
        $user->assignRole($data['role']);
        return $user;
    }

    /**
     * Update an existing user and optionally update the role.
     */
    public function update(User $user, array $data): User
    {
        if (isset($data['name'])) $user->name = $data['name'];
        if (isset($data['email'])) $user->email = $data['email'];
        if (isset($data['password'])) $user->password = Hash::make($data['password']);
        if (isset($data['milestone'])) $user->milestone = $data['milestone'];
        $user->save();
        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }
        return $user;
    }

    /**
     * Delete a user.
     */
    public function delete(User $user): void
    {
        $user->delete();
    }
} 