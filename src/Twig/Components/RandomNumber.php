<?php

namespace App\Twig\Components;

use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\TwigComponent\Attribute\PostMount;


#[AsLiveComponent]
class RandomNumber
{
    use DefaultActionTrait;

    public int $length = 3;

    #[LiveProp(writable: true)]
    public int $error = 5;

    #[LiveProp(writable: true)]
    public int $seed = 0;

    #[LiveProp(writable: true)]
    public string $region = 'en_US';

    #[LiveProp(writable: true)]
    public array $generatedData = [];

    #[LiveProp(writable: true)]
    public $user;

    public $idx;




    #[PostMount]
    public function postMount(): void
    {

        $faker = \Faker\Factory::create($this->region);
        $faker->seed($this->seed);
        $i = $this->idx;
        for($i; $i<$this->length; $i++) {
            $this->generatedData[] = [
                'index' => $i+1,
                'id' => $faker->uuid,
                'name' => $faker->name,
                'address' => $faker->address,
                'phone' => $faker->phoneNumber
            ];
        }
    }



    #[LiveAction]
    public function add(){
        $faker = \Faker\Factory::create($this->region);
        $faker->seed(33);
        $i = $this->idx;
        for($i; $i<$this->idx+2; $i++) {
            $this->generatedData[] = [
                'index' => $i+1,
                'id' => $faker->uuid,
                'name' => $faker->name,
                'address' => $faker->address,
                'phone' => $faker->phoneNumber
            ];
        }
        // dump($this->generatedData);
    }

    public function getError(): int
    {
        $this->generatedData = [];
        return $this->error;
    }

    public function getSeed(): int
    {
        $this->generatedData = [];
        return $this->seed;
    }

    public function getRegion(): string
    {
        $this->generatedData = [];
        return $this->region;
    }

    public function getGeneratedData(){
        // $faker = \Faker\Factory::create($this->region);
        // $length = 2;
        // $faker->seed($this->seed);

        // for($i=0; $i<$length; $i++) {
        //     $this->generatedData[] = [
        //         'index' => $i+1,
        //         'id' => $faker->uuid,
        //         'name' => $faker->name,
        //         'address' => $faker->address,
        //         'phone' => $faker->phoneNumber
        //     ];
        // }

        return $this->generatedData;
    }




}
