export type Locale = 'es' | 'en'

type TranslationSchema = {
    navbar: {
        links: {
            home: string
            about: string
            services: string
            process: string
            portfolio: string
        }
        cta: string
    }
    hero: {
        ariaLabel: string
        badge: string
        title: string
        description: string
        servicesCta: string
        quoteCta: string
    }
    about: {
        badge: string
        title: string
        highlight: string

        mainTitle: string
        description: string

        features: {
            title: string
            description: string
        }[]

        technologies: string

        stats: {
            experience: {
                title: string
                description: string
            }
            projects: {
                title: string
                description: string
            }
            satisfaction: {
                title: string
                description: string
            }
        }
    },
    services: {
        badge: string
        title: string
        highlight: string
        items: {
            title: string
            description: string
        }[]
        primaryCta: string
        secondaryCta: string
    },
    process: {
        trailer: string
        cta: string
        steps: {
            title: string
            description: string
        }[]
    },
    portfolio: {
        badge: string
        title: string
        highlight: string
        description: string
        viewProject: string
        startProject: string
        challengeLabel: string
        solutionLabel: string
    },
    contact: {
        badge: string
        title: string
        highlight: string
        description: string

        info: {
            emailLabel: string
            phoneLabel: string
            locationLabel: string
            locationValue: string
        }

        expectations: {
            title: string
            items: string[]
        }

        form: {
            namePlaceholder: string
            phonePlaceholder: string
            emailPlaceholder: string
            messagePlaceholder: string
            submit: string
            submitting: string
            success: string
            errors: {
                nameRequired: string
                emailRequired: string
                emailInvalid: string
                messageRequired: string
            }
        }
    },
    footer: {
        brandTagline: string
        description: string

        sections: {
            company: string
            services: string
            resources: string
        }

        links: {
            company: {
                about: string
                services: string
                process: string
                contact: string
            }
            services: {
                webDevelopment: string
                mobileApps: string
                softwareDevelopment: string
                digitalMarketing: string
                aiAutomation: string
            }
            resources: {
                caseStudies: string
                requestQuote: string
                support: string
            }
        }

        contact: {
            location: string
        }
        marquee: string
        copyright: string
    },
}

export const translations: Record<Locale, TranslationSchema> = {
    es: {
        navbar: {
            links: {
                home: 'Inicio',
                about: 'Nosotros',
                services: 'Servicios',
                process: 'Proceso',
                portfolio: 'Portfolio',
            },
            cta: 'Cotizar proyecto',
        },
        hero: {
            ariaLabel: 'Agencia de desarrollo web y marketing digital',
            badge: 'Agencia de Desarrollo Web y Marketing Digital',
            title: 'Desarrollo Web, Marketing Digital y Automatización con IA',
            description:
                'Creamos sitios web, aplicaciones y estrategias digitales diseñadas para atraer clientes, automatizar procesos y hacer crecer tu negocio en México y Estados Unidos. Nuestro enfoque combina desarrollo web profesional, diseño moderno y marketing digital orientado a resultados.',
            servicesCta: 'Ver servicios',
            quoteCta: 'Solicitar cotización',
        },
        about: {
            badge: 'Sobre Nosotros',
            title: 'Creamos Tecnología que',
            highlight: 'Impulsa tu Negocio',

            mainTitle: 'Desarrollo Web, Apps y Soluciones Digitales',

            description:
                'Somos una agencia especializada en desarrollo web, aplicaciones móviles, marketing digital y soluciones tecnológicas a la medida. Ayudamos a empresas en México y Estados Unidos a crecer mediante tecnología moderna, automatización y plataformas digitales optimizadas para generar clientes.',

            features: [
                {
                    title: 'Desarrollo Web Profesional',
                    description:
                        'Creamos sitios web y plataformas optimizadas para SEO, velocidad y conversión.',
                },
                {
                    title: 'Aplicaciones Móviles',
                    description:
                        'Desarrollamos apps para iOS y Android que conectan tu negocio con tus clientes.',
                },
                {
                    title: 'Marketing Digital y SEO',
                    description:
                        'Implementamos estrategias para atraer tráfico, generar leads y posicionar tu marca.',
                },
                {
                    title: 'Automatización con IA',
                    description:
                        'Creamos herramientas inteligentes que optimizan procesos y aumentan productividad.',
                },
            ],

            technologies: 'Tecnologías que utilizamos',

            stats: {
                experience: {
                    title: 'Años de experiencia',
                    description: 'Construyendo soluciones digitales',
                },
                projects: {
                    title: 'Proyectos desarrollados',
                    description: 'Web, sistemas y apps móviles',
                },
                satisfaction: {
                    title: 'Clientes satisfechos',
                    description: 'Relaciones a largo plazo',
                },
            },
        },
        services: {
            badge: 'Servicios',
            title: 'Soluciones digitales para',
            highlight: 'hacer crecer tu negocio',
            items: [
                {
                    title: 'Desarrollo Web',
                    description:
                        'Creamos sitios web profesionales, rápidos y optimizados para SEO que ayudan a tu negocio a atraer clientes y crecer en internet.',
                },
                {
                    title: 'Aplicaciones Móviles',
                    description:
                        'Desarrollamos aplicaciones móviles para iOS y Android que conectan tu negocio con tus clientes desde cualquier lugar.',
                },
                {
                    title: 'Marketing Digital y SEO',
                    description:
                        'Posicionamos tu empresa en Google mediante estrategias de SEO, publicidad digital y generación de leads.',
                },
                {
                    title: 'Desarrollo de Software',
                    description:
                        'Construimos sistemas y plataformas a la medida para automatizar procesos y optimizar la operación de tu empresa.',
                },
                {
                    title: 'Automatización con IA',
                    description:
                        'Implementamos inteligencia artificial para automatizar tareas, mejorar atención al cliente y optimizar procesos.',
                },
                {
                    title: 'Consultoría Tecnológica',
                    description:
                        'Te ayudamos a definir la mejor estrategia tecnológica para escalar tu negocio con soluciones digitales eficientes.',
                },
            ],
            primaryCta: 'Solicitar cotización',
            secondaryCta: 'Ver proyectos',
        },
        process: {
            trailer: 'Cómo trabajamos',
            cta: 'Cotiza tu proyecto',
            steps: [
                {
                    title: 'Reunión de descubrimiento',
                    description:
                        'Agendamos una reunión contigo para entender tu negocio, objetivos y requerimientos del proyecto. Analizamos qué necesitas y cuál es la mejor solución tecnológica para tu empresa.',
                },
                {
                    title: 'Análisis y cotización',
                    description:
                        'Nuestro equipo analiza los requerimientos del proyecto y prepara una cotización detallada con alcance, tiempos de desarrollo y tecnologías recomendadas.',
                },
                {
                    title: 'Revisión y aprobación',
                    description:
                        'Presentamos la cotización en una segunda reunión para revisar cada punto del proyecto, resolver dudas y realizar ajustes antes de comenzar el desarrollo.',
                },
                {
                    title: 'Inicio del proyecto',
                    description:
                        'Una vez aprobada la propuesta, enviamos las formas de pago, generalmente 50% inicial y 50% al finalizar. Después entregamos el plan de trabajo y los primeros avances del proyecto.',
                },
                {
                    title: 'Entrega y capacitación',
                    description:
                        'Al finalizar el desarrollo entregamos todos los accesos del proyecto, realizamos pruebas finales y brindamos capacitación para que puedas administrar tu plataforma correctamente.',
                },
            ],
        },
        portfolio: {
            badge: 'Proyectos',
            title: 'Proyectos que generan',
            highlight: 'resultados reales',
            description:
                'Desarrollamos sitios web, aplicaciones y plataformas digitales que generan crecimiento real para nuestros clientes.',
            viewProject: 'Ver proyecto',
            startProject: 'Iniciar mi proyecto',
            challengeLabel: 'El reto',
            solutionLabel: 'Nuestra solución',
        },
        contact: {
            badge: 'Contacto',
            title: 'Hablemos de tu',
            highlight: 'próximo proyecto',
            description:
                'Cuéntanos qué necesitas y nuestro equipo te ayudará a construir una solución digital que impulse el crecimiento de tu negocio.',

            info: {
                emailLabel: 'Correo electrónico',
                phoneLabel: 'Teléfono / WhatsApp',
                locationLabel: 'Ubicación',
                locationValue: 'México / Estados Unidos',
            },

            expectations: {
                title: 'Qué esperar',
                items: [
                    'Respuesta en menos de 24 horas',
                    'Consulta inicial gratuita',
                    'Propuesta personalizada',
                ],
            },

            form: {
                namePlaceholder: 'Full name *',
                phonePlaceholder: 'Phone',
                emailPlaceholder: 'Email address *',
                messagePlaceholder: 'Tell us about your project *',
                submit: 'Send message',
                submitting: 'Sending...',
                success: 'Message sent successfully',
                errors: {
                    nameRequired: 'Name is required',
                    emailRequired: 'Email is required',
                    emailInvalid: 'Invalid email format',
                    messageRequired: 'Message is required',
                },
            },
        },
        footer: {
            brandTagline: 'Desarrollo Web • Software • IA',
            description:
                'Agencia especializada en desarrollo web, aplicaciones móviles, software a la medida y marketing digital. Construimos soluciones tecnológicas que ayudan a empresas en México y Estados Unidos a crecer y automatizar procesos.',

            sections: {
                company: 'Compañía',
                services: 'Servicios',
                resources: 'Recursos',
            },

            links: {
                company: {
                    about: 'Sobre nosotros',
                    services: 'Servicios',
                    process: 'Proceso',
                    contact: 'Contacto',
                },
                services: {
                    webDevelopment: 'Desarrollo web',
                    mobileApps: 'Aplicaciones móviles',
                    softwareDevelopment: 'Desarrollo de software',
                    digitalMarketing: 'Marketing digital',
                    aiAutomation: 'Automatización con IA',
                },
                resources: {
                    caseStudies: 'Casos de éxito',
                    requestQuote: 'Solicitar cotización',
                    support: 'Soporte',
                },
            },

            contact: {
                location: 'México / Estados Unidos',
            },

            marquee:
                'DESARROLLO WEB ◆ APLICACIONES MÓVILES ◆ SOFTWARE A MEDIDA ◆ AUTOMATIZACIÓN CON IA ◆ MARKETING DIGITAL ◆',

            copyright: 'All rights reserved.',
        },
    },
    en: {
       navbar: {
  links: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    process: 'Process',
    portfolio: 'Portfolio',
  },
  cta: 'Request a quote',
},
        hero: {
            ariaLabel: 'Web development and digital marketing agency',
            badge: 'Web Development and Digital Marketing Agency',
            title: 'Web Development, Digital Marketing, and AI Automation',
            description:
                'We build websites, applications, and digital strategies designed to attract customers, automate processes, and grow your business in Mexico and the United States. Our approach combines professional web development, modern design, and results-driven digital marketing.',
            servicesCta: 'View services',
            quoteCta: 'Request a quote',
        },
        about: {
            badge: 'About us',
            title: 'We build technology that',
            highlight: 'drives your business',

            mainTitle: 'Web Development, Apps and Digital Solutions',

            description:
                'We are an agency specialized in web development, mobile applications, digital marketing, and custom technology solutions. We help businesses in Mexico and the United States grow through modern technology, automation, and digital platforms optimized to generate leads.',

            features: [
                {
                    title: 'Professional Web Development',
                    description:
                        'We build websites and platforms optimized for SEO, speed, and conversion.',
                },
                {
                    title: 'Mobile Applications',
                    description:
                        'We develop iOS and Android apps that connect your business with your customers.',
                },
                {
                    title: 'Digital Marketing and SEO',
                    description:
                        'We implement strategies to attract traffic, generate leads, and position your brand.',
                },
                {
                    title: 'AI Automation',
                    description:
                        'We create intelligent tools that optimize processes and increase productivity.',
                },
            ],

            technologies: 'Technologies we use',

            stats: {
                experience: {
                    title: 'Years of experience',
                    description: 'Building digital solutions',
                },
                projects: {
                    title: 'Projects delivered',
                    description: 'Web, systems and mobile apps',
                },
                satisfaction: {
                    title: 'Satisfied clients',
                    description: 'Long-term relationships',
                },
            },
        },
        services: {
            badge: 'Services',
            title: 'Digital solutions to',
            highlight: 'grow your business',
            items: [
                {
                    title: 'Web Development',
                    description:
                        'We build professional, fast, and SEO-optimized websites that help your business attract customers and grow online.',
                },
                {
                    title: 'Mobile Applications',
                    description:
                        'We develop iOS and Android mobile apps that connect your business with your customers from anywhere.',
                },
                {
                    title: 'Digital Marketing and SEO',
                    description:
                        'We position your business on Google through SEO strategies, digital advertising, and lead generation.',
                },
                {
                    title: 'Software Development',
                    description:
                        'We build custom systems and platforms to automate processes and optimize your business operations.',
                },
                {
                    title: 'AI Automation',
                    description:
                        'We implement artificial intelligence to automate tasks, improve customer service, and optimize workflows.',
                },
                {
                    title: 'Technology Consulting',
                    description:
                        'We help you define the best technology strategy to scale your business with efficient digital solutions.',
                },
            ],
            primaryCta: 'Request a quote',
            secondaryCta: 'View projects',
        },
        process: {
            trailer: 'How we work',
            cta: 'Request a quote',
            steps: [
                {
                    title: 'Discovery meeting',
                    description:
                        'We schedule a meeting with you to understand your business, goals, and project requirements. We analyze what you need and determine the best technology solution for your company.',
                },
                {
                    title: 'Analysis and proposal',
                    description:
                        'Our team reviews the project requirements and prepares a detailed proposal including scope, development timeline, and recommended technologies.',
                },
                {
                    title: 'Review and approval',
                    description:
                        'We present the proposal in a second meeting to review every detail of the project, answer questions, and make adjustments before development begins.',
                },
                {
                    title: 'Project kickoff',
                    description:
                        'Once the proposal is approved, we send the payment terms, usually 50% upfront and 50% upon completion. After that, we deliver the work plan and initial project progress.',
                },
                {
                    title: 'Delivery and training',
                    description:
                        'At the end of development, we deliver all project access credentials, run final testing, and provide training so you can manage your platform properly.',
                },
            ],
        },
        portfolio: {
            badge: 'Projects',
            title: 'Projects that generate',
            highlight: 'real results',
            description:
                'We build websites, applications, and digital platforms that generate real growth for our clients.',
            viewProject: 'View project',
            startProject: 'Start my project',
            challengeLabel: 'The challenge',
            solutionLabel: 'Our solution',
        },
        contact: {
            badge: 'Contact',
            title: 'Let’s talk about your',
            highlight: 'next project',
            description:
                'Tell us what you need and our team will help you build a digital solution that drives business growth.',

            info: {
                emailLabel: 'Email',
                phoneLabel: 'Phone / WhatsApp',
                locationLabel: 'Location',
                locationValue: 'Mexico / United States',
            },

            expectations: {
                title: 'What to expect',
                items: [
                    'Reply within 24 hours',
                    'Free initial consultation',
                    'Custom proposal',
                ],
            },

            form: {
                namePlaceholder: 'Full name *',
                phonePlaceholder: 'Phone',
                emailPlaceholder: 'Email address *',
                messagePlaceholder: 'Tell us about your project *',
                submit: 'Send message',
                submitting: 'Sending...',
                success: 'Message sent successfully',
                errors: {
                    nameRequired: 'Name is required',
                    emailRequired: 'Email is required',
                    emailInvalid: 'Invalid email format',
                    messageRequired: 'Message is required',
                },
            },
        },
        footer: {
            brandTagline: 'Web Development • Software • AI',
            description:
                'Agency specialized in web development, mobile applications, custom software, and digital marketing. We build technology solutions that help businesses in Mexico and the United States grow and automate processes.',

            sections: {
                company: 'Company',
                services: 'Services',
                resources: 'Resources',
            },

            links: {
                company: {
                    about: 'About us',
                    services: 'Services',
                    process: 'Process',
                    contact: 'Contact',
                },
                services: {
                    webDevelopment: 'Web development',
                    mobileApps: 'Mobile applications',
                    softwareDevelopment: 'Software development',
                    digitalMarketing: 'Digital marketing',
                    aiAutomation: 'AI automation',
                },
                resources: {
                    caseStudies: 'Case studies',
                    requestQuote: 'Request a quote',
                    support: 'Support',
                },
            },

            contact: {
                location: 'Mexico / United States',
            },

            marquee:
                'WEB DEVELOPMENT ◆ MOBILE APPLICATIONS ◆ CUSTOM SOFTWARE ◆ AI AUTOMATION ◆ DIGITAL MARKETING ◆',

            copyright: 'All rights reserved.',
        },
    },
}
