<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Book;
use App\Policies\BookPolicy;
use PHPUnit\Framework\TestCase;

class BookPolicyTest extends TestCase
{
    public function test_any_authenticated_user_can_create()
    {
        $user = $this->createMock(User::class);
        $policy = new BookPolicy();
        $this->assertTrue($policy->create($user));
    }

    public function test_creator_or_superadmin_can_update_and_delete()
    {
        $user = $this->createMock(User::class);
        $user->id = 1;
        $user->method('hasRole')->willReturn(false);

        $book = $this->createMock(Book::class);
        $book->user_id = 1;

        $policy = new BookPolicy();
        $this->assertTrue($policy->update($user, $book));
        $this->assertTrue($policy->delete($user, $book));
    }

    public function test_non_creator_non_superadmin_cannot_update_or_delete()
    {
        $user = $this->createMock(User::class);
        $user->method('hasRole')->willReturn(false);
        $user->method('__get')->willReturnCallback(function ($key) {
            return $key === 'id' ? 2 : null;
        });
        $user->id = 2;
        
        $book = $this->createMock(Book::class);
        $book->user_id = 1;
        
        $policy = new BookPolicy();
        $this->assertFalse($policy->update($user, $book));
        $this->assertFalse($policy->delete($user, $book));
    }

    public function test_superadmin_can_update_and_delete_any_book()
    {
        $user = $this->createMock(User::class);
        $user->id = 2;
        $user->method('hasRole')->willReturnCallback(fn($role) => $role === 'superAdmin');

        $book = $this->createMock(Book::class);
        $book->user_id = 1;

        $policy = new BookPolicy();
        $this->assertTrue($policy->update($user, $book));
        $this->assertTrue($policy->delete($user, $book));
    }
}
