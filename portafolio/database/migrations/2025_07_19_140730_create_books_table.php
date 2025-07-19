<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Book title
            $table->text('description')->nullable(); // Book description
            $table->unsignedBigInteger('author_id'); // Author foreign key
            $table->unsignedBigInteger('user_id'); // User who created the book
            $table->integer('published_year'); // Year of publication
            $table->string('genre'); // Book genre
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('author_id')->references('id')->on('authors')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
