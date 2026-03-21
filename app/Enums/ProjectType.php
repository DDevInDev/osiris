<?php

namespace App\Enums;

enum ProjectType: string
{
    case Development = 'development';
    case WebDesign = 'web_design';
    case Branding = 'branding';
    case SEO = 'seo';
    case SEM = 'sem';
    case Marketing = 'marketing';
    case Automation = 'automation';
    case AiSolution = 'ai_solution';
    case Maintenance = 'maintenance';

    public function label(): string
    {
        return match ($this) {
            self::Development => 'Desarrollo',
            self::WebDesign => 'Diseño web',
            self::Branding => 'Branding',
            self::SEO => 'SEO',
            self::SEM => 'SEM',
            self::Marketing => 'Marketing',
            self::Automation => 'Automatización',
            self::AiSolution => 'Solución IA',
            self::Maintenance => 'Mantenimiento',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn (self $type) => [
                'value' => $type->value,
                'label' => $type->label(),
            ],
            self::cases()
        );
    }

    public static function values(): array
    {
        return array_column(self::options(), 'value');
    }
}