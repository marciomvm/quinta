import { useState, useRef, useCallback, useEffect } from 'react';
import { useProducts } from '@/contexts/ProductsContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus, LogOut, ImagePlus, Wrench } from 'lucide-react';
import { toast } from 'sonner';

// ─── Password Gate ────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'quinta2024';

const PasswordGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-sm rounded-xl border bg-background p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <Wrench className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">Enter the admin password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="••••••••"
              autoFocus
            />
            {error && <p className="text-sm text-destructive">Incorrect password.</p>}
          </div>
          <Button type="submit" className="w-full">Unlock</Button>
        </form>
      </div>
    </div>
  );
};

// ─── Empty product form state ─────────────────────────────────────────────────

type ProductForm = {
  name: string;
  descEn: string;
  descPt: string;
  priceDay1: string;
  priceFollowing: string;
  priceDeposit: string;
  imageUrl: string;
};

const emptyForm = (): ProductForm => ({
  name: '',
  descEn: '',
  descPt: '',
  priceDay1: '',
  priceFollowing: '',
  priceDeposit: '',
  imageUrl: '',
});

const productToForm = (p: Product): ProductForm => ({
  name: p.name,
  descEn: p.desc.en,
  descPt: p.desc.pt,
  priceDay1: p.price.day1,
  priceFollowing: p.price.following,
  priceDeposit: p.price.deposit,
  imageUrl: p.imageUrl,
});

const formToProduct = (f: ProductForm): Omit<Product, 'id'> => ({
  name: f.name.trim(),
  desc: { en: f.descEn.trim(), pt: f.descPt.trim() },
  price: {
    day1: f.priceDay1.trim(),
    following: f.priceFollowing.trim(),
    deposit: f.priceDeposit.trim(),
  },
  imageUrl: f.imageUrl,
});

// ─── Product Form Modal ───────────────────────────────────────────────────────

const ProductFormModal = ({
  open,
  title,
  initial,
  onSave,
  onClose,
}: {
  open: boolean;
  title: string;
  initial: ProductForm;
  onSave: (f: ProductForm) => void;
  onClose: () => void;
}) => {
  const [form, setForm] = useState<ProductForm>(initial);
  const fileRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens with a new initial value
  const handleOpenChange = useCallback(
    (o: boolean) => {
      if (!o) onClose();
    },
    [onClose]
  );

  // Sync form when initial changes (edit opens a different product)
  useEffect(() => { setForm(initial); }, [initial]);

  const set = (key: keyof ProductForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, imageUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Product name is required.'); return; }
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form id="product-form" onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="pf-name">Name *</Label>
            <Input id="pf-name" value={form.name} onChange={set('name')} placeholder="e.g. Stihl 235 Strimmer" />
          </div>

          {/* Descriptions */}
          <div className="space-y-1">
            <Label htmlFor="pf-desc-en">Description (EN) *</Label>
            <Textarea id="pf-desc-en" value={form.descEn} onChange={set('descEn')} rows={3} placeholder="English description..." />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-desc-pt">Description (PT)</Label>
            <Textarea id="pf-desc-pt" value={form.descPt} onChange={set('descPt')} rows={3} placeholder="Descrição em português..." />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="pf-day1">1st Day</Label>
              <Input id="pf-day1" value={form.priceDay1} onChange={set('priceDay1')} placeholder="35€" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pf-following">Following Days</Label>
              <Input id="pf-following" value={form.priceFollowing} onChange={set('priceFollowing')} placeholder="30€/day" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pf-deposit">Deposit</Label>
              <Input id="pf-deposit" value={form.priceDeposit} onChange={set('priceDeposit')} placeholder="150€" />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Photo</Label>
            <div className="flex items-center gap-3">
              {form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="h-20 w-20 rounded-lg object-cover border"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                  <ImagePlus className="h-6 w-6" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  {form.imageUrl ? 'Change Photo' : 'Upload Photo'}
                </Button>
                {form.imageUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => setForm((f) => ({ ...f, imageUrl: '' }))}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Images are stored in your browser's local storage. Keep files small (&lt; 500 KB recommended).
            </p>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="product-form">Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

const AdminPanel = ({ onLock }: { onLock: () => void }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { aboutImages, setAboutImage } = useSettings();

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const handleAdd = (f: ProductForm) => {
    addProduct(formToProduct(f));
    setAddOpen(false);
    toast.success('Product added.');
  };

  const handleEdit = (f: ProductForm) => {
    if (!editTarget) return;
    updateProduct(editTarget.id, formToProduct(f));
    setEditTarget(null);
    toast.success('Product updated.');
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    setDeleteTarget(null);
    toast.success('Product deleted.');
  };

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Wrench className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold leading-none text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Quinta Tool Hire</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setAddOpen(true)}>
              <Plus className="mr-1 h-4 w-4" /> Add Product
            </Button>
            <Button variant="outline" size="icon" title="Lock" onClick={onLock}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content tabs */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="settings">General Settings</TabsTrigger>
            </TabsList>
            <p className="text-sm text-muted-foreground">Changes are saved automatically to your device</p>
          </div>

          <TabsContent value="products" className="mt-0 space-y-4">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
                <Wrench className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="font-medium text-muted-foreground">No products yet</p>
                <Button className="mt-4" onClick={() => setAddOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" /> Add your first product
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="group relative overflow-hidden rounded-xl border bg-background shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground/40">
                          <ImagePlus className="h-10 w-10" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="mb-1 font-semibold text-foreground">{p.name}</h3>
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{p.desc.en}</p>

                      {/* Pricing badges */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {p.price.day1 && p.price.day1 !== '—' && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            Day 1: {p.price.day1}
                          </span>
                        )}
                        {p.price.following && p.price.following !== '—' && (
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            +days: {p.price.following}
                          </span>
                        )}
                        {p.price.deposit && p.price.deposit !== '—' && (
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            Dep: {p.price.deposit}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setEditTarget(p)}
                        >
                          <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => setDeleteTarget(p)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-0 space-y-6">
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-foreground">About Us - Images</h2>
              <p className="mb-6 text-sm text-muted-foreground">Upload up to 4 images to appear in the "About Us" gallery on the home page. Ideal size is square (1:1).</p>
              
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                {aboutImages.map((img, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <Label>Slot {idx + 1}</Label>
                    <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
                      {img ? (
                        <img src={img} alt={`Slot ${idx + 1}`} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground/40">
                          <ImagePlus className="mb-2 h-8 w-8" />
                          <span className="text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => document.getElementById(`about-upload-${idx}`)?.click()}>
                        {img ? 'Change' : 'Upload'}
                      </Button>
                      {img && (
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground px-2" onClick={() => setAboutImage(idx, '')}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <input
                      id={`about-upload-${idx}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setAboutImage(idx, ev.target?.result as string);
                          toast.success(`Image ${idx + 1} updated`);
                        };
                        reader.readAsDataURL(file);
                        e.target.value = ''; // reset
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add modal */}
      <ProductFormModal
        open={addOpen}
        title="Add New Product"
        initial={emptyForm()}
        onSave={handleAdd}
        onClose={() => setAddOpen(false)}
      />

      {/* Edit modal */}
      {editTarget && (
        <ProductFormModal
          open={!!editTarget}
          title={`Edit: ${editTarget.name}`}
          initial={productToForm(editTarget)}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteTarget?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the product from the catalogue. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// ─── Page root ────────────────────────────────────────────────────────────────

const Admin = () => {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <AdminPanel onLock={() => setUnlocked(false)} />;
};

export default Admin;
