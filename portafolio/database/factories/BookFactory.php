<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'author_id' => Author::factory(),
            'user_id' => User::factory(),
            'published_year' => $this->faker->year(),
            'genre' => $this->faker->word(),
        ];
    }
}
