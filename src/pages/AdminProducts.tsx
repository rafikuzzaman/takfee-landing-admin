import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Pencil, X, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  name_bn: string;
  description: string | null;
  description_bn: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  is_active: boolean;
  stock_quantity: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data as Product[]);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "ত্রুটি",
        description: "পণ্য লোড করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          name_bn: formData.name_bn,
          description: formData.description,
          description_bn: formData.description_bn,
          price: formData.price,
          original_price: formData.original_price,
          stock_quantity: formData.stock_quantity,
          is_active: formData.is_active,
        })
        .eq("id", editingProduct.id);

      if (error) throw error;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } as Product : p
        )
      );

      setEditingProduct(null);
      toast({
        title: "সফল",
        description: "পণ্য আপডেট হয়েছে।",
      });
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "পণ্য আপডেট করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const toggleProductActive = async (product: Product) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_active: !product.is_active })
        .eq("id", product.id);

      if (error) throw error;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, is_active: !p.is_active } : p
        )
      );

      toast({
        title: "সফল",
        description: `পণ্য ${!product.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"} করা হয়েছে।`,
      });
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">প্রোডাক্ট ম্যানেজমেন্ট</h1>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card key={product.id} className={!product.is_active ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name_bn}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name_bn}</h3>
                    <p className="text-sm text-muted-foreground">{product.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xl font-bold text-primary">৳{product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ৳{product.original_price}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      স্টক: {product.stock_quantity} পিস
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.is_active}
                      onCheckedChange={() => toggleProductActive(product)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {product.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    এডিট
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                পণ্য এডিট করুন
                <Button variant="ghost" size="icon" onClick={() => setEditingProduct(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>পণ্যের নাম (বাংলা)</Label>
                  <Input
                    value={formData.name_bn || ""}
                    onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>পণ্যের নাম (English)</Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>বিবরণ (বাংলা)</Label>
                  <Textarea
                    value={formData.description_bn || ""}
                    onChange={(e) => setFormData({ ...formData, description_bn: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>দাম (৳)</Label>
                    <Input
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>পূর্বের দাম (৳)</Label>
                    <Input
                      type="number"
                      value={formData.original_price || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, original_price: parseFloat(e.target.value) || null })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>স্টক পরিমাণ</Label>
                  <Input
                    type="number"
                    value={formData.stock_quantity || ""}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>পণ্য সক্রিয় রাখুন</Label>
                </div>
                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  সংরক্ষণ করুন
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
