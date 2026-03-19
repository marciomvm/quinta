import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';
import { translations } from '@/i18n/translations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

const HireTerms = () => {
  const { t } = useLanguage();
  const { products } = useProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-foreground">{t(translations.hireTerms.title)}</h1>
        <p className="text-muted-foreground">{t(translations.hireTerms.subtitle)}</p>
      </div>

      {/* Pricing table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 overflow-hidden rounded-xl border"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">{t(translations.hireTerms.col1)}</TableHead>
              <TableHead className="font-semibold">{t(translations.hireTerms.col2)}</TableHead>
              <TableHead className="font-semibold">{t(translations.hireTerms.col3)}</TableHead>
              <TableHead className="font-semibold">{t(translations.hireTerms.col4)}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} className="transition-colors hover:bg-muted/30">
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.price.day1}</TableCell>
                <TableCell>{p.price.following}</TableCell>
                <TableCell>{p.price.deposit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <div className="mb-16 flex items-start gap-2 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        {t(translations.hireTerms.note)}
      </div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>{t(translations.hireTerms.formTitle)}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t(translations.contact.firstName)}</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>{t(translations.contact.email)}</Label>
                  <Input type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t(translations.contact.tool)}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t(translations.contact.selectTool)} />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t(translations.contact.dates)}</Label>
                <Input type="text" placeholder="e.g. 15-18 March" />
              </div>
              <div className="space-y-2">
                <Label>{t(translations.contact.message)}</Label>
                <Textarea rows={3} />
              </div>
              <Button type="submit" className="w-full">
                {t(translations.contact.send)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HireTerms;
