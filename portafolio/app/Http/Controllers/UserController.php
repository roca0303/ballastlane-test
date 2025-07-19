<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of users (public route).
     */
    public function index()
    {
        // Return all users using a resource collection
        return UserResource::collection(User::all());
    }

    /**
     * Store a newly created user in storage (superAdmin only).
     */
    public function store(StoreUserRequest $request, UserService $userService)
    {
        // Authorization handled by policy
        $this->authorize('create', User::class);
        $user = $userService->create($request->validated());
        return new UserResource($user);
    }

    /**
     * Display the specified user (public route).
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    /**
     * Update the specified user in storage (superAdmin only).
     */
    public function update(UpdateUserRequest $request, $id, UserService $userService)
    {
        $user = User::findOrFail($id);
        $this->authorize('update', $user);
        $user = $userService->update($user, $request->validated());
        return new UserResource($user);
    }

    /**
     * Remove the specified user from storage (superAdmin only).
     */
    public function destroy($id, UserService $userService)
    {
        $user = User::findOrFail($id);
        $this->authorize('delete', $user);
        $userService->delete($user);
        return response()->json(['message' => 'User deleted successfully']);
    }
} 