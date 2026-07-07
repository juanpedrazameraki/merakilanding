/* ─────────────────────────────────────────────────────────────────────────
   Fuente de verdad ÚNICA de la sección "Tecnologías".
   Todas las variantes (cards / arquitectura) leen de aquí — nada se hardcodea
   dentro de los componentes. Para agregar/quitar tecnologías o stacks, edita
   SOLO este archivo (y añade el path de marca en techIcons.ts si es nueva).

   Copys bilingües como { es, en }; resuélvelos con `t(loc, lang)`.
   Nota de tono: las descripciones están escritas en lenguaje de CLIENTE (no
   técnico) a propósito — evita jerga como "API", "caché", "runtime", "logs".
   ───────────────────────────────────────────────────────────────────────── */
import type { Lang } from '../i18n/translations';
import { BRAND_ICONS } from './techIcons';

export type Loc = { es: string; en: string };
export const t = (l: Loc, lang: Lang): string => l[lang];

/* Íconos de línea (stroke) para conceptos sin marca (roles, capacidades,
   nodos, ítems no-tecnológicos). viewBox 0 0 24 24, stroke=currentColor. */
export const LINE_ICONS: Record<string, string> = {
  api: 'M8 4a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2M16 4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2',
  activity: 'M3 12h4l3 8 4-16 3 8h4',
  layers: 'M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5',
  scale: 'M3 17l6-6 4 4 8-8M16 7h5v5',
  shield: 'M12 3l7 3v5c0 4.4-3 8-7 9.6C8 19 5 15.4 5 11V6z',
  gauge: 'M12 13l4-4M4.5 18a8 8 0 1 1 15 0',
  wrench: 'M15 7a4 4 0 0 0-5.4 4.6l-6 6 2.8 2.8 6-6A4 4 0 0 0 17 9l-2.5 2.5-2-2z',
  growth: 'M12 21v-9m0 0c0-3-2-5-6-5 0 4 2 6 6 6zm0-3c0-3 2-4.5 6-4.5 0 3.5-2 4.5-6 4.5z',
  user: 'M4 20a8 8 0 0 1 16 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  server: 'M4 5h16v6H4zM4 13h16v6H4zM7.5 8h.01M7.5 16h.01',
  check: 'M20 6.5L9.5 17 4 11.5',
  cloud: 'M6.5 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.4A3.6 3.6 0 0 1 17.5 18z',
  lock: 'M6.5 11V8a5.5 5.5 0 1 1 11 0v3M5.5 11h13v9h-13z',
  chip: 'M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M6 6h12v12H6z',
  bolt: 'M13 3L5 13h6l-1 8 8-11h-6z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4.3-4.3',
  megaphone: 'M3 10v4h4l5 4V6L7 10H3zM17 8.5a4 4 0 0 1 0 7',
  mail: 'M3 6h18v12H3zM3.5 6.5l8.5 6 8.5-6',
  chart: 'M4 4v16h16M8 16v-5M12 16v-9M16 16v-3',
  share: 'M4 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M16 6a2 2 0 1 0 4 0 2 2 0 1 0-4 0M16 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0M8 11l8-4M8 13l8 4',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18',
};

export function resolveIcon(key: string): { d: string; stroke: boolean } {
  if (BRAND_ICONS[key]) return { d: BRAND_ICONS[key], stroke: false };
  if (LINE_ICONS[key]) return { d: LINE_ICONS[key], stroke: true };
  return { d: LINE_ICONS.chip, stroke: true };
}

/* ── Registro de tecnologías ─────────────────────────────────────────────── */
export interface Tech {
  name: string;
  brand: string; // color de marca (revelado al hover)
  icon: string; // clave en BRAND_ICONS o LINE_ICONS
  desc: Loc; // qué aporta, en lenguaje de cliente
}

export type TechKey =
  | 'react' | 'vue' | 'angular' | 'next' | 'typescript' | 'tailwind' | 'pinia'
  | 'laravel' | 'node' | 'nestjs' | 'express' | 'php' | 'rest' | 'graphql'
  | 'mysql' | 'postgresql' | 'redis' | 'mongodb' | 'amazons3'
  | 'docker' | 'aws' | 'cloudflare' | 'nginx' | 'githubactions' | 'git' | 'linux' | 'sentry' | 'uptime';

export const TECH: Record<TechKey, Tech> = {
  // Interfaz (lo que ve el usuario)
  react: { name: 'React', brand: '#61DAFB', icon: 'react', desc: { es: 'Interfaces rápidas y modernas', en: 'Fast, modern interfaces' } },
  vue: { name: 'Vue.js', brand: '#4FC08D', icon: 'vue', desc: { es: 'Interfaces ágiles y ligeras', en: 'Nimble, lightweight interfaces' } },
  angular: { name: 'Angular', brand: '#DD0031', icon: 'angular', desc: { es: 'Ideal para sistemas grandes', en: 'Great for large systems' } },
  next: { name: 'Next.js', brand: '#FFFFFF', icon: 'next', desc: { es: 'Sitios veloces y bien posicionados', en: 'Fast, well-ranked sites' } },
  typescript: { name: 'TypeScript', brand: '#3178C6', icon: 'typescript', desc: { es: 'Menos errores en el desarrollo', en: 'Fewer bugs while building' } },
  tailwind: { name: 'Tailwind CSS', brand: '#38BDF8', icon: 'tailwind', desc: { es: 'Diseño consistente y a medida', en: 'Consistent, custom design' } },
  pinia: { name: 'Pinia', brand: '#FFD859', icon: 'pinia', desc: { es: 'Organiza la información de la app', en: 'Organizes the app’s data' } },
  // Servidor (la lógica de tu negocio)
  laravel: { name: 'Laravel', brand: '#FF2D20', icon: 'laravel', desc: { es: 'Base sólida para tu negocio', en: 'Solid foundation for your business' } },
  node: { name: 'Node.js', brand: '#5FA04E', icon: 'node', desc: { es: 'Motor del lado del servidor', en: 'Powers the server side' } },
  nestjs: { name: 'NestJS', brand: '#E0234E', icon: 'nestjs', desc: { es: 'Servidor ordenado y escalable', en: 'Ordered, scalable server' } },
  express: { name: 'Express', brand: '#FFFFFF', icon: 'express', desc: { es: 'Conexiones rápidas y ligeras', en: 'Fast, lightweight connections' } },
  php: { name: 'PHP 8', brand: '#777BB4', icon: 'php', desc: { es: 'Lenguaje maduro y confiable', en: 'Mature, reliable language' } },
  rest: { name: 'REST API', brand: '#22d3ee', icon: 'api', desc: { es: 'Comunica tus sistemas entre sí', en: 'Connects your systems together' } },
  graphql: { name: 'GraphQL', brand: '#E10098', icon: 'graphql', desc: { es: 'Trae justo los datos que se necesitan', en: 'Fetches exactly the data needed' } },
  // Datos (dónde se guarda la información)
  mysql: { name: 'MySQL', brand: '#4479A1', icon: 'mysql', desc: { es: 'Base de datos confiable', en: 'Reliable database' } },
  postgresql: { name: 'PostgreSQL', brand: '#4169E1', icon: 'postgresql', desc: { es: 'Base de datos robusta', en: 'Robust database' } },
  redis: { name: 'Redis', brand: '#FF4438', icon: 'redis', desc: { es: 'Hace todo mucho más rápido', en: 'Makes everything much faster' } },
  mongodb: { name: 'MongoDB', brand: '#47A248', icon: 'mongodb', desc: { es: 'Base de datos flexible', en: 'Flexible database' } },
  amazons3: { name: 'Amazon S3', brand: '#569A31', icon: 'amazons3', desc: { es: 'Guarda archivos e imágenes', en: 'Stores files and images' } },
  // Infraestructura (dónde vive y cómo crece)
  docker: { name: 'Docker', brand: '#2496ED', icon: 'docker', desc: { es: 'Entornos estables y portables', en: 'Stable, portable environments' } },
  aws: { name: 'AWS', brand: '#FF9900', icon: 'aws', desc: { es: 'Servidores potentes y globales', en: 'Powerful, global servers' } },
  cloudflare: { name: 'Cloudflare', brand: '#F38020', icon: 'cloudflare', desc: { es: 'Velocidad y seguridad mundial', en: 'Worldwide speed and security' } },
  nginx: { name: 'Nginx', brand: '#009639', icon: 'nginx', desc: { es: 'Reparte el tráfico del sitio', en: 'Distributes site traffic' } },
  githubactions: { name: 'GitHub Actions', brand: '#2088FF', icon: 'githubactions', desc: { es: 'Publica los cambios de forma automática', en: 'Ships changes automatically' } },
  git: { name: 'Git', brand: '#F05032', icon: 'git', desc: { es: 'Historial y control del proyecto', en: 'Project history and control' } },
  linux: { name: 'Linux', brand: '#FCC624', icon: 'linux', desc: { es: 'Servidores estables', en: 'Stable servers' } },
  sentry: { name: 'Sentry', brand: '#8B5CF6', icon: 'sentry', desc: { es: 'Detecta errores al instante', en: 'Detects errors instantly' } },
  uptime: { name: 'Uptime', brand: '#22d3ee', icon: 'activity', desc: { es: 'Avisa si algo deja de funcionar', en: 'Alerts if anything goes down' } },
};

/* ── Ítems y columnas de la arquitectura ─────────────────────────────────────
   Un ítem puede ser una tecnología (tech) o un concepto propio (label+icon),
   así una landing muestra SEO / Presencia digital y un SaaS muestra su stack. */
export interface ArchItem {
  tech?: TechKey;
  label?: Loc;
  icon?: string;
  desc?: Loc;
}
export interface ArchColumn {
  key: string;
  label: Loc;
  role: Loc;
  icon: string;
  items: ArchItem[];
}

// Encabezados de columna reutilizables (labels en lenguaje de cliente).
const COL = {
  interfaz: { key: 'interfaz', label: { es: 'Interfaz', en: 'Interface' }, role: { es: 'Lo que ve y usa tu cliente', en: 'What your client sees & uses' }, icon: 'layers' },
  servidor: { key: 'servidor', label: { es: 'Servidor', en: 'Server' }, role: { es: 'La lógica de tu negocio', en: 'Your business logic' }, icon: 'server' },
  datos: { key: 'datos', label: { es: 'Datos', en: 'Data' }, role: { es: 'Dónde se guarda la información', en: 'Where information is stored' }, icon: 'database' },
  infra: { key: 'infra', label: { es: 'Infraestructura', en: 'Infrastructure' }, role: { es: 'Dónde vive y cómo crece', en: 'Where it lives and how it grows' }, icon: 'cloud' },
  app: { key: 'app', label: { es: 'App', en: 'App' }, role: { es: 'La app en el teléfono', en: 'The app on the phone' }, icon: 'activity' },
  sitio: { key: 'sitio', label: { es: 'Sitio Web', en: 'Website' }, role: { es: 'Diseño y páginas', en: 'Design and pages' }, icon: 'layers' },
  seo: { key: 'seo', label: { es: 'SEO y Contenido', en: 'SEO & Content' }, role: { es: 'Que te encuentren en Google', en: 'Get found on Google' }, icon: 'search' },
  presencia: { key: 'presencia', label: { es: 'Presencia Digital', en: 'Digital Presence' }, role: { es: 'Marketing y captación de clientes', en: 'Marketing and lead capture' }, icon: 'megaphone' },
} as const;

/* ── Tipos de proyecto (el selector) — cada uno define SUS columnas ─────────── */
export interface ProjectType {
  key: string;
  label: Loc;
  icon: string;
  blurb: Loc;
  columns: ArchColumn[];
}

const T = (...keys: TechKey[]): ArchItem[] => keys.map((tech) => ({ tech }));

export const PROJECT_TYPES: ProjectType[] = [
  {
    key: 'saas',
    label: { es: 'Plataforma / SaaS', en: 'Platform / SaaS' },
    icon: 'cloud',
    blurb: { es: 'Una plataforma con cuentas, suscripciones y panel en tiempo real.', en: 'A platform with accounts, subscriptions and a real-time panel.' },
    columns: [
      { ...COL.interfaz, items: T('vue', 'typescript', 'tailwind', 'pinia') },
      { ...COL.servidor, items: T('laravel', 'rest', 'php') },
      { ...COL.datos, items: T('mysql', 'redis', 'amazons3') },
      { ...COL.infra, items: T('docker', 'aws', 'nginx', 'cloudflare') },
    ],
  },
  {
    key: 'erp',
    label: { es: 'ERP / Sistema empresarial', en: 'ERP / Business system' },
    icon: 'server',
    blurb: { es: 'Un sistema para administrar tu empresa: procesos, inventario y reportes.', en: 'A system to run your company: processes, inventory and reports.' },
    columns: [
      { ...COL.interfaz, items: T('angular', 'typescript', 'tailwind') },
      { ...COL.servidor, items: T('nestjs', 'node', 'graphql') },
      { ...COL.datos, items: T('postgresql', 'redis') },
      { ...COL.infra, items: T('docker', 'aws', 'nginx') },
    ],
  },
  {
    key: 'marketplace',
    label: { es: 'Tienda / Marketplace', en: 'Store / Marketplace' },
    icon: 'scale',
    blurb: { es: 'Un catálogo con pagos y mucho tráfico, con búsqueda y velocidad.', en: 'A catalog with payments and high traffic, plus search and speed.' },
    columns: [
      { ...COL.interfaz, items: T('next', 'react', 'typescript', 'tailwind') },
      { ...COL.servidor, items: T('node', 'express', 'rest') },
      { ...COL.datos, items: T('postgresql', 'redis', 'mongodb') },
      { ...COL.infra, items: T('aws', 'cloudflare', 'docker') },
    ],
  },
  {
    key: 'webapp',
    label: { es: 'Aplicación Web', en: 'Web App' },
    icon: 'layers',
    blurb: { es: 'Una aplicación interactiva con información en vivo.', en: 'An interactive application with live information.' },
    columns: [
      { ...COL.interfaz, items: T('react', 'typescript', 'tailwind') },
      { ...COL.servidor, items: T('node', 'nestjs', 'graphql') },
      { ...COL.datos, items: T('postgresql', 'redis') },
      { ...COL.infra, items: T('docker', 'aws', 'nginx') },
    ],
  },
  {
    key: 'mobile',
    label: { es: 'App Móvil', en: 'Mobile App' },
    icon: 'activity',
    blurb: { es: 'Una app para iPhone y Android con sincronización y notificaciones.', en: 'An app for iPhone and Android with sync and notifications.' },
    columns: [
      { ...COL.app, items: T('react', 'typescript') },
      { ...COL.servidor, items: T('node', 'express', 'rest') },
      { ...COL.datos, items: T('postgresql', 'mongodb') },
      { ...COL.infra, items: T('aws', 'docker') },
    ],
  },
  {
    key: 'landing',
    label: { es: 'Landing / Sitio Web', en: 'Landing / Website' },
    icon: 'bolt',
    blurb: { es: 'Un sitio rápido pensado para atraer clientes y aparecer en Google.', en: 'A fast site built to attract clients and rank on Google.' },
    columns: [
      { ...COL.sitio, items: T('next', 'react', 'tailwind') },
      {
        ...COL.seo,
        items: [
          { label: { es: 'Optimización SEO', en: 'SEO optimization' }, icon: 'search', desc: { es: 'Para posicionar en buscadores', en: 'To rank on search engines' } },
          { label: { es: 'Vista previa al compartir', en: 'Rich link previews' }, icon: 'share', desc: { es: 'Se ve bien en WhatsApp y redes', en: 'Looks great on WhatsApp & social' } },
          { label: { es: 'Blog y contenido', en: 'Blog & content' }, icon: 'server', desc: { es: 'Atrae visitas de forma orgánica', en: 'Attracts organic traffic' } },
        ],
      },
      {
        ...COL.presencia,
        items: [
          { label: { es: 'Analítica de visitas', en: 'Visitor analytics' }, icon: 'chart', desc: { es: 'Medimos visitas y resultados', en: 'We measure visits & results' } },
          { label: { es: 'Formulario de contacto', en: 'Contact form' }, icon: 'mail', desc: { es: 'Captura clientes potenciales', en: 'Captures potential clients' } },
          { label: { es: 'Redes y WhatsApp', en: 'Social & WhatsApp' }, icon: 'megaphone', desc: { es: 'Conecta con tu audiencia', en: 'Connects with your audience' } },
        ],
      },
      {
        ...COL.infra,
        items: [
          { tech: 'cloudflare' },
          { tech: 'aws' },
          { label: { es: 'Dominio seguro', en: 'Secure domain' }, icon: 'lock', desc: { es: 'Tu sitio, seguro y confiable (SSL)', en: 'Your site, secure and trusted (SSL)' } },
        ],
      },
    ],
  },
];

/* ── Stack detallado por categoría ───────────────────────────────────────── */
export interface Category {
  key: string;
  label: Loc;
  techs: TechKey[];
}

export const CATEGORIES: Category[] = [
  { key: 'frontend', label: { es: 'Interfaz', en: 'Interface' }, techs: ['vue', 'react', 'angular', 'next', 'typescript', 'tailwind', 'pinia'] },
  { key: 'backend', label: { es: 'Servidor', en: 'Server' }, techs: ['laravel', 'node', 'nestjs', 'express', 'php', 'rest', 'graphql'] },
  { key: 'datos', label: { es: 'Datos', en: 'Data' }, techs: ['mysql', 'postgresql', 'redis', 'mongodb', 'amazons3'] },
  { key: 'cloud', label: { es: 'Infraestructura', en: 'Infrastructure' }, techs: ['aws', 'cloudflare', 'nginx'] },
  { key: 'devops', label: { es: 'Automatización', en: 'Automation' }, techs: ['docker', 'githubactions', 'git', 'linux', 'sentry', 'uptime'] },
];

/* ── Beneficios ──────────────────────────────────────────────────────────── */
export interface Benefit {
  key: string;
  icon: string;
  title: Loc;
  desc: Loc;
}

export const BENEFITS: Benefit[] = [
  { key: 'seguridad', icon: 'shield', title: { es: 'Seguridad integral', en: 'End-to-end security' }, desc: { es: 'Protegemos tu producto y la información de tus clientes en cada nivel.', en: 'We protect your product and your clients’ data at every level.' } },
  { key: 'escalabilidad', icon: 'scale', title: { es: 'Crece contigo', en: 'Grows with you' }, desc: { es: 'Tu producto soporta más usuarios sin perder velocidad.', en: 'Your product handles more users without losing speed.' } },
  { key: 'rendimiento', icon: 'gauge', title: { es: 'Rápido y fluido', en: 'Fast and smooth' }, desc: { es: 'Optimizamos cada detalle para una experiencia veloz.', en: 'We optimize every detail for a fast experience.' } },
  { key: 'monitoreo', icon: 'activity', title: { es: 'Siempre disponible', en: 'Always available' }, desc: { es: 'Vigilamos que todo funcione y resolvemos antes de que lo notes.', en: 'We watch everything and fix issues before you notice.' } },
  { key: 'mantenible', icon: 'wrench', title: { es: 'Fácil de mantener', en: 'Easy to maintain' }, desc: { es: 'Código ordenado y documentado, listo para seguir mejorando.', en: 'Tidy, documented code, ready to keep improving.' } },
  { key: 'crecimiento', icon: 'growth', title: { es: 'Listo para el futuro', en: 'Ready for the future' }, desc: { es: 'Bases sólidas para añadir nuevas funciones sin fricción.', en: 'Solid foundations to add new features without friction.' } },
];

/* ── Capacidades (badges del encabezado — NO son tecnologías) ─────────────── */
export interface Capability {
  key: string;
  icon: string;
  label: Loc;
}

export const CAPABILITIES: Capability[] = [
  { key: 'arqui', icon: 'layers', label: { es: 'Bien estructurado', en: 'Well structured' } },
  { key: 'escala', icon: 'scale', label: { es: 'Listo para crecer', en: 'Ready to grow' } },
  { key: 'seguridad', icon: 'shield', label: { es: 'Seguro desde el inicio', en: 'Secure from day one' } },
  { key: 'rendimiento', icon: 'gauge', label: { es: 'Rápido y optimizado', en: 'Fast and optimized' } },
];

/* ── Copys de encabezado / CTA por variante ──────────────────────────────── */
export const COPY = {
  // Variante "cards" (tradicional)
  cards: {
    eyebrow: { es: 'Tecnologías', en: 'Technologies' },
    titleA: { es: 'Nuestras ', en: 'Our ' },
    titleB: { es: 'herramientas', en: 'toolkit' },
    sub: { es: 'Elegimos cuidadosamente las herramientas según cada proyecto — no usamos lo mismo para todo.', en: 'We carefully pick the tools for each project — we don’t use the same for everything.' },
  },
  // Variante "arquitectura"
  arch: {
    eyebrow: { es: 'Tecnologías', en: 'Technologies' },
    titleA: { es: 'Tecnología que impulsa ', en: 'Technology that powers ' },
    titleB: { es: 'soluciones reales', en: 'real solutions' },
    sub: { es: 'Elegimos las herramientas ideales para construir un producto rápido, seguro y listo para crecer.', en: 'We pick the right tools to build a product that’s fast, secure and ready to grow.' },
    sidebarTitle: { es: 'Elige tu tipo de proyecto', en: 'Choose your project type' },
    sidebarSub: { es: 'Dinos qué quieres construir y te mostramos las herramientas ideales.', en: 'Tell us what you want to build and we’ll show you the right tools.' },
    archTitle: { es: 'Cómo lo construimos', en: 'How we build it' },
    clientLabel: { es: 'Cliente', en: 'Client' },
    clientRole: { es: 'Quien usa tu producto', en: 'Who uses your product' },
    clientNode: { es: 'Tus usuarios', en: 'Your users' },
    clientSub: { es: 'Navegador y móvil', en: 'Browser and mobile' },
    monitor: { es: 'Vigilamos tu producto las 24 horas para que siempre esté disponible', en: 'We watch your product 24/7 so it’s always available' },
    stackTitle: { es: 'Las herramientas que usamos', en: 'The tools we use' },
    stackSub: { es: 'Seleccionadas según lo que necesita cada proyecto.', en: 'Selected for what each project needs.' },
    allLabel: { es: 'Todas', en: 'All' },
    benefitsTitle: { es: 'Ingeniería en la que puedes confiar', en: 'Engineering you can rely on' },
    ctaTitle: { es: '¿Listo para construir tu próximo proyecto?', en: 'Ready to build your next project?' },
    ctaSub: { es: 'Cuéntanos tu idea y construyamos juntos algo increíble.', en: 'Tell us your idea and let’s build something great together.' },
    ctaBtn: { es: 'Agendar una reunión', en: 'Book a meeting' },
    advise: { es: '¿No estás seguro? Nuestro equipo te asesora con la mejor opción.', en: 'Not sure? Our team will advise you on the best option.' },
    adviseBtn: { es: 'Agendar asesoría', en: 'Get advice' },
  },
} as const;
