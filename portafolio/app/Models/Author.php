<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'bio',
        'user_id',
    ];

    /**
     * Get the user who created the author.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
