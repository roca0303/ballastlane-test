<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Author;
use App\Policies\AuthorPolicy;
use PHPUnit\Framework\TestCase;

class AuthorPolicyTest extends TestCase
{
    public function test_any_authenticated_user_can_create()
    {
        $user = $this->createMock(User::class);
        $policy = new AuthorPolicy();
        $this->assertTrue($policy->create($user));
    }

    public function test_creator_or_superadmin_can_update_and_delete()
    {
        $user = $this->createMock(User::class);
        $user->id = 1;
        $user->method('hasRole')->willReturn(false);
        $user->method('__get')->willReturnCallback(function ($key) {
            return $key === 'id' ? 1 : null;
        });

        $author = $this->createMock(Author::class);
        $author->user_id = 1;
        $author->method('__get')->willReturnCallback(function ($key) {
            return $key === 'user_id' ? 1 : null;
        });

        $policy = new AuthorPolicy();
        $this->assertTrue($policy->update($user, $author));
        $this->assertTrue($policy->delete($user, $author));
    }

    public function test_non_creator_non_superadmin_cannot_update_or_delete()
    {
        $user = $this->createMock(User::class);
        $user->id = 2;
        $user->method('hasRole')->willReturn(false);
        $user->method('__get')->willReturnCallback(function ($key) {
            return $key === 'id' ? 2 : null;
        });

        $author = $this->createMock(Author::class);
        $author->user_id = 1;

        $policy = new AuthorPolicy();
        $this->assertFalse($policy->update($user, $author));
        $this->assertFalse($policy->delete($user, $author));
    }

    public function test_superadmin_can_update_and_delete_any_author()
    {
        $user = $this->createMock(User::class);
        $user->id = 2;
        $user->method('hasRole')->willReturnCallback(fn($role) => $role === 'superAdmin');
        $user->method('__get')->willReturnCallback(function ($key) {
            return $key === 'id' ? 2 : null;
        });

        $author = $this->createMock(Author::class);
        $author->user_id = 1;

        $policy = new AuthorPolicy();
        $this->assertTrue($policy->update($user, $author));
        $this->assertTrue($policy->delete($user, $author));
    }
}
