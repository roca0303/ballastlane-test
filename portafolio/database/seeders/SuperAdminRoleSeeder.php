<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class SuperAdminRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the superAdmin role for the api guard if it does not exist
        Role::firstOrCreate([
            'name' => 'superAdmin',
            'guard_name' => 'api',
        ]);
    }
} 