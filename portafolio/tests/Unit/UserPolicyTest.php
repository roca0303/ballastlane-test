<?php

namespace Tests\Unit;

use App\Models\User;
use App\Policies\UserPolicy;
use PHPUnit\Framework\TestCase;

class UserPolicyTest extends TestCase
{
    public function test_superadmin_can_create_update_delete()
    {
        $user = $this->getUserWithRole('superAdmin');
        $policy = new UserPolicy();

        $this->assertTrue($policy->create($user));
        $this->assertTrue($policy->update($user));
        $this->assertTrue($policy->delete($user));
    }

    public function test_non_superadmin_cannot_create_update_delete()
    {
        $user = $this->getUserWithRole('user');
        $policy = new UserPolicy();

        $this->assertFalse($policy->create($user));
        $this->assertFalse($policy->update($user));
        $this->assertFalse($policy->delete($user));
    }

    private function getUserWithRole($role)
    {
        $user = $this->getMockBuilder(User::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['hasRole'])
            ->getMock();

        $user->method('hasRole')->willReturnCallback(function ($arg) use ($role) {
            return $arg === $role;
        });

        return $user;
    }
}