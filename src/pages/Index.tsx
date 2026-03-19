import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';
import { useSettings } from '@/contexts/SettingsContext';
import { translations } from '@/i18n/translations';
import { ArrowRight, MapPin, Phone, Wrench, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Home = () => {
  const { t } = useLanguage();
  const { products } = useProducts();
  const { aboutImages } = useSettings();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/5">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
                <MapPin className="h-4 w-4" />
                Penamacor, Portugal
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                {t(translations.hero.slogan)}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                {t(translations.hero.subtitle)}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/contact">
                    {t(translations.hero.cta)} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/tools">
                    <Wrench className="mr-1 h-4 w-4" />
                    {t(translations.nav.ourTools)}
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto w-full"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border bg-background lg:aspect-square">
                <img
                  src="/hero.png"
                  alt="Quinta Tool Hire Equipment"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-12 md:grid-cols-4">
          {[
            { value: '9+', label: { en: 'Professional Tools', pt: 'Ferramentas Profissionais' } },
            { value: '€15', label: { en: 'Starting From / Day', pt: 'A Partir de / Dia' } },
            { value: '100%', label: { en: 'Well Maintained', pt: 'Bem Mantidas' } },
            { value: '7/7', label: { en: 'Days Available', pt: 'Dias Disponíveis' } },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t(stat.label)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic Equipment Gallery */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h2 className="text-3xl font-bold text-foreground text-center sm:text-left">
              {t(translations.gallery.title)}
            </h2>
            <Link to="/tools" className="text-sm font-medium text-primary hover:underline flex items-center">
              {t(translations.nav.ourTools)} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {products.slice(0, 8).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-xl bg-muted border"
              >
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
                    <ImagePlus className="h-8 w-8" />
                  </div>
                )}
                {/* Overlay with tool name */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-medium text-white line-clamp-1">{p.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              {t(translations.about.title)}
            </h2>
            <div className="mb-12 space-y-4 text-muted-foreground">
              <p>{t(translations.about.p1)}</p>
              <p>{t(translations.about.p2)}</p>
              <p>{t(translations.about.p3)}</p>
            </div>

            {/* 4 Images Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {aboutImages.map((imgUrl, i) => (
                <motion.div
                  key={'about-img-' + i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-square overflow-hidden rounded-xl border bg-muted shadow-sm"
                >
                  {imgUrl ? (
                    <img src={imgUrl} alt={`About ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
                      <ImagePlus className="h-8 w-8" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              {t(translations.contact.findUs)}
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border">
            <iframe
              title="Penamacor location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24530.68!2d-7.17!3d40.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3c0a8b8b8b8b8b%3A0x0!2sPenamacor%2C+Portugal!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            {t(translations.hero.slogan)}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">{t(translations.hero.cta)}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="tel:+351937728966">
                <Phone className="mr-1 h-4 w-4" /> +351 937 728 966
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
