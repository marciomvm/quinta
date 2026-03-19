import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';
import { Menu, X, Wrench } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t(translations.nav.home) },
    { to: '/tools', label: t(translations.nav.ourTools) },
    { to: '/hire-terms', label: t(translations.nav.hireTerms) },
    { to: '/contact', label: t(translations.nav.contact) },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Quinta Tool Hire
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                isActive(l.to) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="ml-3 min-w-[52px] text-xs font-semibold"
            onClick={toggleLang}
          >
            {lang === 'en' ? '🇵🇹 PT' : '🇬🇧 EN'}
          </Button>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="outline" size="sm" className="text-xs font-semibold" onClick={toggleLang}>
            {lang === 'en' ? '🇵🇹 PT' : '🇬🇧 EN'}
          </Button>
          <button onClick={() => setOpen(!open)} className="text-foreground" aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t bg-background px-4 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${
                isActive(l.to) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
