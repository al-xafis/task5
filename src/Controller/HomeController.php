<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        // $locale = 'ru_RU'; #en_US #ru_RU #it_IT
        // $faker = \Faker\Factory::create($locale);
        // $length = 20;
        // $seed = 1234;
        // $faker->seed($seed);
        // for($i=0; $i<$length; $i++) {
        //     $data[] = [
        //         'index' => $i+1,
        //         'id' => $faker->uuid,
        //         'name' => $faker->name,
        //         'address' => $faker->address,
        //         'phone' => $faker->phoneNumber
        //     ];
        // }
        // dd($data);
        return $this->render('home/index.html.twig');
    }

    #[Route('/a', name: 'app_a')]
    public function indexa(): Response
    {
        $locale = 'ru_RU'; #en_US #ru_RU #it_IT
        $faker = \Faker\Factory::create($locale);
        $length = 2;
        $seed = 1234;
        $faker->seed($seed);
        for($i=0; $i<$length; $i++) {
            $data[] = [
                'index' => $i+1,
                'id' => $faker->uuid,
                'name' => $faker->name,
                'address' => $faker->address,
                'phone' => $faker->phoneNumber
            ];
        }
        // dd($data);
        // return $this->render('home/index.html.twig');
        return new JsonResponse($data);
    }

    #[Route('/s', name: 'app_s')]
    public function react(): Response
    {
        // $locale = 'ru_RU'; #en_US #ru_RU #it_IT
        // $faker = \Faker\Factory::create($locale);
        // $length = 20;
        // $seed = 1234;
        // $faker->seed($seed);
        // for($i=0; $i<$length; $i++) {
        //     $data[] = [
        //         'index' => $i+1,
        //         'id' => $faker->uuid,
        //         'name' => $faker->name,
        //         'address' => $faker->address,
        //         'phone' => $faker->phoneNumber
        //     ];
        // }
        // dd($data);
        return $this->render('home/s.html.twig');
    }
}
