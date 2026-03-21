import { ClientCase } from '@/types/client-case'

export const clientCases: ClientCase[] = [
  {
    id: 1,
    name: 'Cantillo Property Services',
    industry: {
      es: 'Servicios para el hogar',
      en: 'Home Services',
    },
    description: {
      es: 'Empresa de servicios residenciales en Texas enfocada en mantenimiento y reparación de propiedades.',
      en: 'Residential services company in Texas focused on property maintenance and repair.',
    },
    challenge: {
      es: 'La empresa no tenía presencia digital ni generación constante de clientes desde internet.',
      en: 'The company had no digital presence or consistent lead generation from the internet.',
    },
    solution: {
      es: 'Diseñamos un sitio web optimizado para SEO local, configuramos campañas de Google Ads y automatizamos la captura de leads mediante formularios inteligentes.',
      en: 'We designed a website optimized for local SEO, set up Google Ads campaigns, and automated lead capture through smart forms.',
    },
    results: [
      {
        metric: { es: 'Leads generados', en: 'Generated leads' },
        value: '+180%',
        icon: 'trending',
      },
      {
        metric: { es: 'Costo por lead', en: 'Cost per lead' },
        value: '-35%',
        icon: 'zap',
      },
      {
        metric: { es: 'Tráfico web', en: 'Web traffic' },
        value: '+220%',
        icon: 'target',
      },
    ],
    tags: [
      { es: 'Desarrollo Web', en: 'Web Development' },
      { es: 'SEO Local', en: 'Local SEO' },
      { es: 'Google Ads', en: 'Google Ads' },
    ],
    photo: '/images/projects/project1.jpg',
    url: 'https://cantillopropertyservices.com',
  },
  {
    id: 2,
    name: 'UrbanFit',
    industry: {
      es: 'E-commerce',
      en: 'E-commerce',
    },
    description: {
      es: 'Tienda online enfocada en productos fitness y bienestar.',
      en: 'Online store focused on fitness and wellness products.',
    },
    challenge: {
      es: 'El sitio web tenía baja conversión y muchos usuarios abandonaban el carrito.',
      en: 'The website had low conversion rates and many users abandoned the cart.',
    },
    solution: {
      es: 'Rediseñamos completamente la tienda online, optimizamos la experiencia de compra y mejoramos el rendimiento del sitio.',
      en: 'We completely redesigned the online store, optimized the shopping experience, and improved site performance.',
    },
    results: [
      {
        metric: { es: 'Ventas online', en: 'Online sales' },
        value: '+65%',
        icon: 'trending',
      },
      {
        metric: { es: 'Conversión', en: 'Conversion' },
        value: '+48%',
        icon: 'target',
      },
      {
        metric: { es: 'Velocidad web', en: 'Website speed' },
        value: '-60%',
        icon: 'zap',
      },
    ],
    tags: [
      { es: 'E-commerce', en: 'E-commerce' },
      { es: 'UX/UI', en: 'UX/UI' },
      { es: 'Optimización Web', en: 'Web Optimization' },
    ],
    photo: '/images/projects/project2.jpg',
  },
  {
    id: 3,
    name: 'FinCore',
    industry: {
      es: 'Fintech',
      en: 'Fintech',
    },
    description: {
      es: 'Plataforma digital enfocada en soluciones financieras para pequeñas empresas.',
      en: 'Digital platform focused on financial solutions for small businesses.',
    },
    challenge: {
      es: 'El negocio dependía completamente de publicidad pagada y no tenía tráfico orgánico.',
      en: 'The business depended entirely on paid advertising and had no organic traffic.',
    },
    solution: {
      es: 'Desarrollamos una plataforma optimizada para SEO, estrategia de contenidos y herramientas de automatización para captación de leads.',
      en: 'We developed an SEO-optimized platform, a content strategy, and automation tools for lead generation.',
    },
    results: [
      {
        metric: { es: 'Tráfico orgánico', en: 'Organic traffic' },
        value: '+310%',
        icon: 'trending',
      },
      {
        metric: { es: 'Leads calificados', en: 'Qualified leads' },
        value: '+90%',
        icon: 'target',
      },
      {
        metric: { es: 'Costo de adquisición', en: 'Acquisition cost' },
        value: '-45%',
        icon: 'zap',
      },
    ],
    tags: [
      { es: 'SEO', en: 'SEO' },
      { es: 'Desarrollo Web', en: 'Web Development' },
      { es: 'Automatización', en: 'Automation' },
    ],
    photo: '/images/projects/project3.jpg',
  },
]