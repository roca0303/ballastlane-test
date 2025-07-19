<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'author_id' => $this->author_id,
            'user_id' => $this->user_id,
            'published_year' => $this->published_year,
            'genre' => $this->genre,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
