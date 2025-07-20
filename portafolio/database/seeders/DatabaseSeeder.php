<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = \App\Models\User::factory(5)->create();

        $authors = \App\Models\Author::factory(5)->make()->each(function ($author) use ($users) {
            $author->user_id = $users->random()->id;
            $author->save();
        });

        \App\Models\Book::factory(10)->make()->each(function ($book) use ($authors, $users) {
            $book->author_id = $authors->random()->id;
            $book->user_id = $users->random()->id;
            $book->save();
        });

        $this->call([
            SuperAdminRoleSeeder::class,
            SuperAdminPermissionSeeder::class,
            // Otros seeders...
        ]);
    }
}
