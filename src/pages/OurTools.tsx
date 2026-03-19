import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';
import { translations } from '@/i18n/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';

const OurTools = () => {
  const { t } = useLanguage();
  const { products } = useProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-foreground">{t(translations.tools.title)}</h1>
        <p className="text-muted-foreground">{t(translations.tools.subtitle)}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground/30">
                    <ImagePlus className="h-10 w-10" />
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <h3
                  className="mb-2 text-lg font-semibold text-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {product.name}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t(product.desc)}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/hire-terms">
                    {t(translations.tools.viewPricing)} <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurTools;
