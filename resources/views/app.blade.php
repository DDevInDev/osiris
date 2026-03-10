<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Osiris Development') }}</title>

    <meta name="description" content="Agencia especializada en desarrollo web, aplicaciones móviles, software a medida y automatización con inteligencia artificial.">

    <meta name="robots" content="index, follow">

    <link rel="canonical" href="{{ url()->current() }}">

    <meta property="og:type" content="website">
    <meta property="og:title" content="Osiris Development - Desarrollo Web">
    <meta property="og:description" content="Desarrollo web, aplicaciones móviles y software a medida.">
    <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">
    <meta property="og:url" content="{{ url()->current() }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Osiris Development">
    <meta name="twitter:description" content="Desarrollo web y software a medida.">
    <meta name="twitter:image" content="{{ asset('images/og-image.jpg') }}">

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    <style>
        html {
            background-color: oklch(1 0 0);
            scroll-behavior: smooth;
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }

        section {
            position: relative;
        }

        @keyframes marquee {
            from {
                transform: translateX(0%)
            }

            to {
                transform: translateX(-50%)
            }
        }

        .animate-marquee {
            animation: marquee 25s linear infinite;
        }

        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        img,
        video {
            content-visibility: auto;
        }
    </style>

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])

    @inertiaHead

        <script type="application/ld+json">
        {!! json_encode([
            "@@context" => "https://schema.org",
            "@@type" => "Organization",
            "name" => "Osiris Development",
            "url" => url('/'),
            "logo" => asset('Logo.svg'),
            "description" => "Agencia especializada en desarrollo web, aplicaciones móviles y software a medida."
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
        </script>

</head>

<body class="font-sans antialiased">

    @inertia

</body>

</html>