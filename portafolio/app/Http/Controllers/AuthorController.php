<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use App\Services\AuthorService;

class AuthorController extends Controller
{
    /**
     * Display a listing of authors (public route).
     */
    public function index()
    {
        // Return all authors using a resource collection
        return AuthorResource::collection(Author::all());
    }

    /**
     * Store a newly created author (authenticated users only).
     */
    public function store(StoreAuthorRequest $request, AuthorService $authorService)
    {
        $this->authorize('create', Author::class);
        $author = $authorService->create($request->validated());
        return new AuthorResource($author);
    }

    /**
     * Display the specified author (public route).
     */
    public function show($id)
    {
        $author = Author::findOrFail($id);
        return new AuthorResource($author);
    }

    /**
     * Update the specified author (only creator or superAdmin).
     */
    public function update(UpdateAuthorRequest $request, $id, AuthorService $authorService)
    {
        $author = Author::findOrFail($id);
        $this->authorize('update', $author);
        $author = $authorService->update($author, $request->validated());
        return new AuthorResource($author);
    }

    /**
     * Remove the specified author (only creator or superAdmin).
     */
    public function destroy($id, AuthorService $authorService)
    {
        $author = Author::findOrFail($id);
        $this->authorize('delete', $author);
        $authorService->delete($author);
        return response()->json(['message' => 'Author deleted successfully']);
    }
}
