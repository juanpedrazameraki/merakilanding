import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Lang, type Translation } from '../i18n/translations';
import { waLink } from '../config';

export type Theme = 'dark' | 'light';

interface SiteContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  isMobile: boolean;
  reducedMotion: boolean;
  T: Translation;
  wa: (msg: string) => string;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const MOBILE_QUERY = '(max-width: 880px)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem('merakicode-lang');
    if (stored === 'es' || stored === 'en') return stored;
    return (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

function initialTheme(): Theme {
  try {
    const stored = localStorage.getItem('merakicode-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch {
    return 'dark';
  }
}

function matches(query: string): boolean {
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

function useMediaFlag(query: string): boolean {
  const [flag, setFlag] = useState(() => matches(query));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setFlag(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, [query]);
  return flag;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const isMobile = useMediaFlag(MOBILE_QUERY);
  const reducedMotion = useMediaFlag(REDUCED_QUERY);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('merakicode-theme', theme);
    } catch {
      /* localStorage puede no estar disponible */
    }
  }, [theme]);

  useEffect(() => {
    const T = translations[lang];
    document.documentElement.setAttribute('lang', lang);
    document.title = T.meta.title;
    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'description');
      document.head.appendChild(el);
    }
    el.setAttribute('content', T.meta.description);
    try {
      localStorage.setItem('merakicode-lang', lang);
    } catch {
      /* localStorage puede no estar disponible */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  );

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      setLang,
      theme,
      toggleTheme,
      isMobile,
      reducedMotion,
      T: translations[lang],
      wa: waLink,
    }),
    [lang, setLang, theme, toggleTheme, isMobile, reducedMotion],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
