<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Laravel\Passport\Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\App;

class SuperAdminPermissionSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

		if (App::environment('local')) {
			Client::updateOrCreate(
				[
					'name' => 'ppac',
					'password_client' => false,
					'personal_access_client' => true,
					'revoked' => false,
				],
				[
	/* 				'secret' => '$2y$12$aVIaJ0Fw9W0o682tAXKOIe9X8EuFkRJBGxh5HTPjDrNCFy1mJYsLO',  */
					'secret' => '$2y$12$aVIaJ0Fw9W0o682tAXKOIe9X8EuFkRJBGxh5HTPjDrNCFy1mJYsLO',  // <-- use your plain secret here
	/* 				$2y$12$aVIaJ0Fw9W0o682tAXKOIe9X8EuFkRJBGxh5HTPjDrNCFy1mJYsLO */

					'redirect' => 'http://localhost',
					'provider' => 'users',
				]
			);

			Client::where('id', 1)->update([
				'secret' => '$2y$12$aVIaJ0Fw9W0o682tAXKOIe9X8EuFkRJBGxh5HTPjDrNCFy1mJYsLO'
			]);
		}

		$permissions = [
			'manage-users',
		];

		foreach ($permissions as $permission) {
			Permission::firstOrCreate(['name' => $permission]);
			Permission::firstOrCreate(['name' => 'manage-users', 'guard_name' => 'api']);
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
