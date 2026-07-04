export type Lang = 'es' | 'en';

interface TitledItem {
  title: string;
  desc: string;
}

interface ServiceItem {
  title: string;
  desc: string;
  chips: string[];
}

interface PricingPlan {
  name: string;
  tag: string;
  price: string;
  cta: string;
  features: { t: string }[];
}

export interface Translation {
  meta: { title: string; description: string };
  nav: {
    services: string;
    process: string;
    portfolio: string;
    pricing: string;
    about: string;
    faq: string;
    contact: string;
    cta: string;
    menu: string;
    langLabel: string;
    themeLabel: string;
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleRotating: string[];
    titleSuffix: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
    live: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
    web: ServiceItem;
    saas: ServiceItem;
    custom: ServiceItem;
  };
  process: {
    eyebrow: string;
    heading: string;
    sub: string;
    s1: TitledItem;
    s2: TitledItem;
    s3: TitledItem;
    s4: TitledItem;
  };
  portfolio: {
    eyebrow: string;
    heading: string;
    sub: string;
    soon: string;
    items: { category: string }[];
  };
  stack: {
    eyebrow: string;
    heading: string;
    sub: string;
    coreLead: string;
    coreHi: string;
    frontend: string;
    backend: string;
    infra: string;
  };
  pricing: {
    eyebrow: string;
    heading: string;
    sub: string;
    popular: string;
    from: string;
    essential: PricingPlan;
    pro: PricingPlan;
    custom: PricingPlan;
  };
  about: {
    eyebrow: string;
    heading: string;
    mission: string;
    team: { name: string; role: string }[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSend: string;
    sent: string;
    or: string;
    phoneLabel: string;
    emailLabel: string;
    locationLabel: string;
    location: string;
  };
  footer: {
    tagline: string;
    nav: string;
    contact: string;
    follow: string;
    privacy: string;
    rights: string;
  };
  wa: {
    hero: string;
    nav: string;
    contact: string;
    svcWeb: string;
    svcSaas: string;
    svcCustom: string;
    planEsencial: string;
    planPro: string;
    planCustom: string;
  };
}

const es: Translation = {
  meta: {
    title: 'MerakiCode — Desarrollo de software, web, apps y SaaS a la medida',
    description:
      'Estudio de desarrollo de software. Creamos sitios web, aplicaciones y plataformas SaaS a la medida para startups y PYMEs. Escríbenos por WhatsApp.',
  },
  nav: {
    services: 'Servicios',
    process: 'Proceso',
    portfolio: 'Portafolio',
    pricing: 'Precios',
    about: 'Nosotros',
    faq: 'FAQ',
    contact: 'Contacto',
    cta: 'WhatsApp',
    menu: 'Menú',
    langLabel: 'Cambiar idioma',
    themeLabel: 'Cambiar tema',
  },
  hero: {
    badge: 'Estudio de desarrollo de software',
    titlePrefix: 'Creamos',
    titleRotating: ['sitios web', 'plataformas SaaS', 'apps móviles', 'software a la medida'],
    titleSuffix: 'que tu empresa necesita.',
    subtitle: 'De la idea a producción, con tecnología moderna y acompañamiento cercano.',
    ctaPrimary: 'Escríbenos por WhatsApp',
    ctaSecondary: 'Ver servicios',
    trust: 'Respondemos en menos de 24 h · Sin compromiso',
    live: 'En vivo',
  },
  services: {
    eyebrow: 'Servicios',
    heading: 'Lo que construimos para ti',
    sub: 'Soluciones digitales end-to-end, desde la idea hasta producción.',
    cta: 'Cotizar por WhatsApp',
    web: {
      title: 'Sitios web y landing pages',
      desc: 'Webs corporativas, landings y portafolios rápidos, responsivos y pensados para convertir.',
      chips: ['Landings', 'Sitios corporativos', 'SEO técnico', 'Carga rápida'],
    },
    saas: {
      title: 'SaaS y aplicaciones web',
      desc: 'Plataformas, dashboards y sistemas web a la medida, escalables y seguros.',
      chips: ['Dashboards', 'Multiusuario', 'Pagos y auth', 'Escalable'],
    },
    custom: {
      title: 'Software a medida e integraciones',
      desc: 'Automatizaciones, APIs e integraciones que conectan tus herramientas.',
      chips: ['Integraciones', 'APIs', 'Automatización', 'ERP / CRM'],
    },
  },
  process: {
    eyebrow: 'Proceso',
    heading: 'Cómo trabajamos',
    sub: 'Un proceso claro y colaborativo en cada proyecto.',
    s1: {
      title: 'Descubrimiento y consultoría',
      desc: 'Entendemos tu negocio, objetivos y alcance para definir la mejor solución.',
    },
    s2: {
      title: 'Propuesta y diseño',
      desc: 'Definimos alcance, tiempos y diseñamos la experiencia antes de escribir código.',
    },
    s3: {
      title: 'Desarrollo y pruebas',
      desc: 'Construimos con buenas prácticas y validamos la calidad en cada iteración.',
    },
    s4: {
      title: 'Entrega y soporte',
      desc: 'Lanzamos, capacitamos a tu equipo y te acompañamos con mantenimiento continuo.',
    },
  },
  portfolio: {
    eyebrow: 'Portafolio',
    heading: 'Estamos construyendo casos de éxito.',
    sub: 'Pronto compartiremos algunos de los proyectos en los que trabajamos.',
    soon: 'Próximamente',
    items: [
      { category: 'Sitio web corporativo' },
      { category: 'Plataforma SaaS' },
      { category: 'Aplicación móvil' },
      { category: 'E-commerce' },
      { category: 'Dashboard analítico' },
      { category: 'Integración / API' },
    ],
  },
  stack: {
    eyebrow: 'Tecnologías',
    heading: 'Un stack moderno y probado',
    sub: 'Trabajamos con tecnologías estándar de la industria para construir productos rápidos, seguros y fáciles de mantener.',
    coreLead: 'Construimos con la ',
    coreHi: 'mejor tecnología',
    frontend: 'Frontend',
    backend: 'Backend',
    infra: 'Infraestructura / DB',
  },
  pricing: {
    eyebrow: 'Precios',
    heading: 'Planes para cada etapa',
    sub: 'Precios de referencia; cada proyecto se cotiza según su alcance.',
    popular: 'Más popular',
    from: 'Desde',
    essential: {
      name: 'Esencial',
      tag: 'Sitios web y landing pages',
      price: '{{DESDE_X}}',
      cta: 'Cotizar por WhatsApp',
      features: [
        { t: 'Sitio web o landing responsiva' },
        { t: 'Hasta 5 secciones / páginas' },
        { t: 'Diseño a medida y SEO básico' },
        { t: 'Formulario e integración WhatsApp' },
      ],
    },
    pro: {
      name: 'Profesional',
      tag: 'Web app / E-commerce',
      price: '{{DESDE_X}}',
      cta: 'Cotizar por WhatsApp',
      features: [
        { t: 'Aplicación web o tienda en línea' },
        { t: 'Panel de administración' },
        { t: 'Pasarela de pagos e integraciones' },
        { t: 'Autenticación de usuarios' },
        { t: 'Optimización y analítica' },
      ],
    },
    custom: {
      name: 'A medida',
      tag: 'SaaS / Software a la medida',
      price: 'Cotización personalizada',
      cta: 'Hablemos por WhatsApp',
      features: [
        { t: 'Plataforma SaaS multiusuario' },
        { t: 'Arquitectura escalable en la nube' },
        { t: 'APIs e integraciones a medida' },
        { t: 'Roadmap y soporte dedicado' },
      ],
    },
  },
  about: {
    eyebrow: 'Nosotros',
    heading: 'Somos MerakiCode',
    mission:
      'Somos un estudio de desarrollo de software enfocado en crear productos digitales con propósito. Combinamos ingeniería sólida, diseño cuidado y acompañamiento cercano para ayudar a startups y PYMEs a crecer.',
    team: [
      { name: '{{NOMBRE 1}}', role: 'Co-fundador · Desarrollo' },
      { name: '{{NOMBRE 2}}', role: 'Co-fundadora · Diseño / UX' },
      { name: '{{NOMBRE 3}}', role: 'Desarrollo backend' },
      { name: '{{NOMBRE 4}}', role: 'Proyectos y clientes' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Cuánto cuesta un proyecto?',
        a: 'Depende del alcance. Manejamos precios de referencia por tipo de proyecto y preparamos una cotización a medida tras entender tus necesidades. Escríbenos por WhatsApp para una estimación.',
      },
      {
        q: '¿Cuánto tiempo toma?',
        a: 'Una landing puede tomar de 1 a 3 semanas; una aplicación o SaaS, algunos meses. Definimos tiempos claros en la propuesta inicial.',
      },
      {
        q: '¿Trabajan con clientes fuera de México?',
        a: 'Sí. Trabajamos de forma remota con clientes en cualquier zona horaria, con comunicación clara y entregas ágiles.',
      },
      {
        q: '¿Ofrecen mantenimiento y soporte?',
        a: 'Sí. Ofrecemos planes de mantenimiento, mejoras y soporte continuo después del lanzamiento.',
      },
      {
        q: '¿Cómo son los pagos?',
        a: 'Normalmente por hitos: un anticipo para iniciar y pagos parciales conforme avanza el proyecto. Lo definimos en el contrato.',
      },
      {
        q: '¿Firman acuerdos de confidencialidad (NDA)?',
        a: 'Por supuesto. Firmamos NDA cuando lo necesites para proteger tu información e ideas.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    heading: '¿Listo para empezar tu proyecto?',
    sub: 'Cuéntanos tu idea y te respondemos en menos de 24 horas.',
    cta: 'Escríbenos por WhatsApp',
    formName: 'Nombre',
    formEmail: 'Correo',
    formMessage: 'Cuéntanos sobre tu proyecto',
    formSend: 'Enviar por WhatsApp',
    sent: 'Abriendo WhatsApp…',
    or: 'o contáctanos directamente',
    phoneLabel: 'WhatsApp',
    emailLabel: 'Correo',
    locationLabel: 'Ubicación',
    location: 'México · Remoto',
  },
  footer: {
    tagline: 'Desarrollamos software a la medida para startups y PYMEs.',
    nav: 'Navegación',
    contact: 'Contacto',
    follow: 'Síguenos',
    privacy: 'Aviso de Privacidad',
    rights: 'Todos los derechos reservados.',
  },
  wa: {
    hero: 'Hola MerakiCode, vi su sitio y me interesa desarrollar un proyecto. ¿Podemos platicar?',
    nav: 'Hola MerakiCode, me gustaría más información.',
    contact: 'Hola MerakiCode, quiero iniciar un proyecto.',
    svcWeb: 'Hola MerakiCode, me interesa un sitio web o landing page. ¿Podemos platicar?',
    svcSaas: 'Hola MerakiCode, me interesa desarrollar una plataforma SaaS o aplicación web. ¿Podemos platicar?',
    svcCustom: 'Hola MerakiCode, necesito software a medida o integraciones para mi negocio. ¿Podemos platicar?',
    planEsencial:
      'Hola MerakiCode, me interesa el plan Esencial (sitio web / landing). ¿Me pueden dar más información?',
    planPro:
      'Hola MerakiCode, me interesa el plan Profesional (web app / e-commerce). ¿Me pueden cotizar?',
    planCustom:
      'Hola MerakiCode, me interesa una solución a medida (SaaS / software). Me gustaría una cotización.',
  },
};

const en: Translation = {
  meta: {
    title: 'MerakiCode — Custom software, web, apps & SaaS development',
    description:
      'Software development studio. We build custom websites, applications and SaaS platforms for startups and SMBs. Message us on WhatsApp.',
  },
  nav: {
    services: 'Services',
    process: 'Process',
    portfolio: 'Portfolio',
    pricing: 'Pricing',
    about: 'About',
    faq: 'FAQ',
    contact: 'Contact',
    cta: 'WhatsApp',
    menu: 'Menu',
    langLabel: 'Change language',
    themeLabel: 'Toggle theme',
  },
  hero: {
    badge: 'Software development studio',
    titlePrefix: 'We build',
    titleRotating: ['websites', 'SaaS platforms', 'mobile apps', 'custom software'],
    titleSuffix: 'that your business needs.',
    subtitle: 'From idea to production, with modern technology and hands-on support.',
    ctaPrimary: 'Message us on WhatsApp',
    ctaSecondary: 'See services',
    trust: 'We reply within 24h · No commitment',
    live: 'Live',
  },
  services: {
    eyebrow: 'Services',
    heading: 'What we build for you',
    sub: 'End-to-end digital solutions, from idea to production.',
    cta: 'Get a quote on WhatsApp',
    web: {
      title: 'Websites & landing pages',
      desc: 'Corporate sites, landing pages and portfolios that are fast, responsive and built to convert.',
      chips: ['Landing pages', 'Corporate sites', 'Technical SEO', 'Fast loading'],
    },
    saas: {
      title: 'SaaS & web applications',
      desc: 'Custom platforms, dashboards and web systems — scalable and secure.',
      chips: ['Dashboards', 'Multi-tenant', 'Payments & auth', 'Built to scale'],
    },
    custom: {
      title: 'Custom software & integrations',
      desc: 'Automations, APIs and integrations that connect your tools.',
      chips: ['Integrations', 'APIs', 'Automation', 'ERP / CRM'],
    },
  },
  process: {
    eyebrow: 'Process',
    heading: 'How we work',
    sub: 'A clear, collaborative process on every project.',
    s1: {
      title: 'Discovery & consulting',
      desc: 'We understand your business, goals and scope to define the best solution.',
    },
    s2: {
      title: 'Proposal & design',
      desc: 'We define scope, timelines and design the experience before writing code.',
    },
    s3: {
      title: 'Development & testing',
      desc: 'We build with best practices and validate quality on every iteration.',
    },
    s4: {
      title: 'Delivery & support',
      desc: 'We launch, train your team and provide ongoing maintenance.',
    },
  },
  portfolio: {
    eyebrow: 'Portfolio',
    heading: "We're building success stories.",
    sub: "We'll soon share some of the projects we're working on.",
    soon: 'Coming soon',
    items: [
      { category: 'Corporate website' },
      { category: 'SaaS platform' },
      { category: 'Mobile app' },
      { category: 'E-commerce' },
      { category: 'Analytics dashboard' },
      { category: 'Integration / API' },
    ],
  },
  stack: {
    eyebrow: 'Technologies',
    heading: 'A modern, proven stack',
    sub: 'We work with industry-standard technologies to build fast, secure and maintainable products.',
    coreLead: 'We build with the ',
    coreHi: 'best technology',
    frontend: 'Frontend',
    backend: 'Backend',
    infra: 'Infrastructure / DB',
  },
  pricing: {
    eyebrow: 'Pricing',
    heading: 'Plans for every stage',
    sub: 'Reference pricing; every project is quoted based on its scope.',
    popular: 'Most popular',
    from: 'From',
    essential: {
      name: 'Essential',
      tag: 'Websites & landing pages',
      price: '{{DESDE_X}}',
      cta: 'Get a quote on WhatsApp',
      features: [
        { t: 'Responsive website or landing page' },
        { t: 'Up to 5 sections / pages' },
        { t: 'Custom design and basic SEO' },
        { t: 'Contact form and WhatsApp integration' },
      ],
    },
    pro: {
      name: 'Professional',
      tag: 'Web app / E-commerce',
      price: '{{DESDE_X}}',
      cta: 'Get a quote on WhatsApp',
      features: [
        { t: 'Web application or online store' },
        { t: 'Admin dashboard' },
        { t: 'Payment gateway and integrations' },
        { t: 'User authentication' },
        { t: 'Optimization and analytics' },
      ],
    },
    custom: {
      name: 'Custom',
      tag: 'SaaS / Custom software',
      price: 'Custom quote',
      cta: "Let's talk on WhatsApp",
      features: [
        { t: 'Multi-user SaaS platform' },
        { t: 'Scalable cloud architecture' },
        { t: 'Custom APIs and integrations' },
        { t: 'Roadmap and dedicated support' },
      ],
    },
  },
  about: {
    eyebrow: 'About us',
    heading: 'We are MerakiCode',
    mission:
      "We're a software development studio focused on building purposeful digital products. We combine solid engineering, thoughtful design and close support to help startups and SMBs grow.",
    team: [
      { name: '{{NAME 1}}', role: 'Co-founder · Development' },
      { name: '{{NAME 2}}', role: 'Co-founder · Design / UX' },
      { name: '{{NAME 3}}', role: 'Backend development' },
      { name: '{{NAME 4}}', role: 'Projects & clients' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'How much does a project cost?',
        a: 'It depends on scope. We use reference pricing per project type and prepare a custom quote after understanding your needs. Message us on WhatsApp for an estimate.',
      },
      {
        q: 'How long does it take?',
        a: 'A landing page can take 1–3 weeks; an application or SaaS, a few months. We set clear timelines in the initial proposal.',
      },
      {
        q: 'Do you work with clients outside Mexico?',
        a: 'Yes. We work remotely with clients in any time zone, with clear communication and agile delivery.',
      },
      {
        q: 'Do you offer maintenance and support?',
        a: 'Yes. We offer maintenance plans, improvements and ongoing support after launch.',
      },
      {
        q: 'How do payments work?',
        a: 'Usually by milestones: a deposit to start and partial payments as the project progresses. We define this in the contract.',
      },
      {
        q: 'Do you sign NDAs?',
        a: 'Absolutely. We sign NDAs whenever you need to protect your information and ideas.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Ready to start your project?',
    sub: "Tell us your idea and we'll reply within 24 hours.",
    cta: 'Message us on WhatsApp',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Tell us about your project',
    formSend: 'Send via WhatsApp',
    sent: 'Opening WhatsApp…',
    or: 'or reach us directly',
    phoneLabel: 'WhatsApp',
    emailLabel: 'Email',
    locationLabel: 'Location',
    location: 'Mexico · Remote',
  },
  footer: {
    tagline: 'We build custom software for startups and SMBs.',
    nav: 'Navigation',
    contact: 'Contact',
    follow: 'Follow us',
    privacy: 'Privacy Notice',
    rights: 'All rights reserved.',
  },
  wa: {
    hero: "Hi MerakiCode, I saw your site and I'm interested in building a project. Can we talk?",
    nav: "Hi MerakiCode, I'd like more information.",
    contact: 'Hi MerakiCode, I want to start a project.',
    svcWeb: "Hi MerakiCode, I'm interested in a website or landing page. Can we talk?",
    svcSaas: "Hi MerakiCode, I'd like to build a SaaS platform or web app. Can we talk?",
    svcCustom: 'Hi MerakiCode, I need custom software or integrations for my business. Can we talk?',
    planEsencial:
      "Hi MerakiCode, I'm interested in the Essential plan (website / landing). Could you share more info?",
    planPro:
      "Hi MerakiCode, I'm interested in the Professional plan (web app / e-commerce). Could you send a quote?",
    planCustom:
      "Hi MerakiCode, I'm interested in a custom solution (SaaS / software). I'd like a quote.",
  },
};

export const translations: Record<Lang, Translation> = { es, en };
