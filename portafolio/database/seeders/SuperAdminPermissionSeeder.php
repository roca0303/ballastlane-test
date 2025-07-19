<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class SuperAdminPermissionSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

		$permissions = [
			'manage-users',
		];

		foreach ($permissions as $permission) {
			Permission::firstOrCreate(['name' => $permission]);
		}

		// Crear roles y asignar permisos
		$superAdminRole = Role::firstOrCreate(['name' => 'superAdmin']);

		$superAdminRole->syncPermissions($permissions);

		$user = User::firstOrCreate(
			['email' => 'superadmin@hotmail.com'],
			[
				'name' => 'Super Admin',
				'password' => bcrypt('saPortafolio123'),
			]
		);

		$user->assignRole($superAdminRole);

	}
}   
