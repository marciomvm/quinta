import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';
import { Wrench, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quinta Tool Hire
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t(translations.footer.tagline)}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">{t(translations.nav.home)}</Link>
              <Link to="/tools" className="hover:text-primary">{t(translations.nav.ourTools)}</Link>
              <Link to="/hire-terms" className="hover:text-primary">{t(translations.nav.hireTerms)}</Link>
              <Link to="/contact" className="hover:text-primary">{t(translations.nav.contact)}</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t(translations.nav.contact)}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="tel:+351937728966" className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" /> +351 937 728 966
              </a>
              <a href="mailto:quintatoolhire@hotmail.com" className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" /> quintatoolhire@hotmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Quinta Tool Hire. {t(translations.footer.rights)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
