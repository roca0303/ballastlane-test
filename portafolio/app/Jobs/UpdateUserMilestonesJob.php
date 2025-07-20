<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class UpdateUserMilestonesJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        
        $userCount = \App\Models\User::count();
        $milestone = intdiv($userCount, 100);
    
        if ($milestone > 0) {
            \App\Models\User::query()->update([
                'milestone' => 'milestone ' . $milestone
            ]);
        }

    }
}
