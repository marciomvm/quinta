import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-foreground">{t(translations.contact.title)}</h1>
        <p className="text-muted-foreground">{t(translations.contact.subtitle)}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>{t(translations.contact.send)}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t(translations.contact.firstName)}</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>{t(translations.contact.lastName)}</Label>
                    <Input />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t(translations.contact.email)}</Label>
                  <Input type="email" />
                </div>
                <div className="space-y-2">
                  <Label>{t(translations.contact.phone)}</Label>
                  <Input type="tel" />
                </div>
                <div className="space-y-2">
                  <Label>{t(translations.contact.message)}</Label>
                  <Textarea rows={4} />
                </div>
                <Button type="submit" className="w-full">
                  {t(translations.contact.send)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="space-y-5">
            <a
              href="tel:+351937728966"
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{t(translations.contact.call)}</div>
                <div className="text-sm text-muted-foreground">+351 937 728 966</div>
              </div>
            </a>

            <a
              href="https://wa.me/351937728966"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: '#25D36620' }}>
                <Phone className="h-5 w-5" style={{ color: '#25D366' }} />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{t(translations.contact.whatsapp)}</div>
                <div className="text-sm text-muted-foreground">+351 937 728 966</div>
              </div>
            </a>

            <a
              href="mailto:quintatoolhire@hotmail.com"
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{t(translations.contact.emailUs)}</div>
                <div className="text-sm text-muted-foreground">quintatoolhire@hotmail.com</div>
              </div>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Facebook className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Facebook</div>
                <div className="text-sm text-muted-foreground">{t(translations.contact.facebook)}</div>
              </div>
            </a>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border">
            <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{t(translations.contact.findUs)}</span>
            </div>
            <iframe
              title="Penamacor location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24530.68!2d-7.17!3d40.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3c0a8b8b8b8b8b%3A0x0!2sPenamacor%2C+Portugal!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
