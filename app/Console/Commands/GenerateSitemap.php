<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate sitemap.xml';

    public function handle()
    {
        $sitemap = Sitemap::create()

            // Home
            ->add(
                Url::create('/')
                    ->setPriority(1.0)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
            )

            // Servicios
            ->add(
                Url::create('/#services')
                    ->setPriority(0.9)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            )

            // Proceso
            ->add(
                Url::create('/#process')
                    ->setPriority(0.8)
            )

            // Proyectos
            ->add(
                Url::create('/#clients')
                    ->setPriority(0.8)
            )

            // Contacto
            ->add(
                Url::create('/#contacto')
                    ->setPriority(0.8)
            );

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');
    }
}