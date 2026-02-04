import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MapPin, Truck, Shield, RotateCcw, CheckCircle } from "lucide-react";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(2, "নাম অবশ্যই দিতে হবে").max(100, "নাম ১০০ অক্ষরের মধ্যে হতে হবে"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক মোবাইল নম্বর দিন (যেমন: 01700000000)"),
  address: z.string().min(10, "সম্পূর্ণ ঠিকানা দিন").max(500, "ঠিকানা ৫০০ অক্ষরের মধ্যে হতে হবে"),
});

interface Product {
  id: string;
  name_bn: string;
  price: number;
}

const OrderFormSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name_bn, price")
        .eq("is_active", true);
      
      if (data) {
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0].id);
        }
      }
    };
    fetchProducts();
  }, []);

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const totalAmount = selectedProductData ? selectedProductData.price * parseInt(quantity) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = orderSchema.safeParse({ name, phone, address });
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    if (!selectedProduct) {
      toast({
        title: "ত্রুটি",
        description: "পণ্য নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("orders").insert({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_address: address.trim(),
        product_id: selectedProduct,
        quantity: parseInt(quantity),
        total_amount: totalAmount,
      });

      if (error) throw error;

      setIsSuccess(true);
      setName("");
      setPhone("");
      setAddress("");
      setQuantity("1");
      
      toast({
        title: "অর্ডার সফল হয়েছে! ✓",
        description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      });
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="order-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center p-12">
            <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">অর্ডার সফল হয়েছে!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              ধন্যবাদ আপনার অর্ডারের জন্য। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline">
              আরেকটি অর্ডার করুন
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            এখনই <span className="text-primary">অর্ডার করুন</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            নিচের ফর্মটি পূরণ করুন, আমরা আপনার সাথে যোগাযোগ করব
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Order Form */}
          <Card className="lg:col-span-3 shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">অর্ডার ফর্ম</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">আপনার নাম *</Label>
                  <Input
                    id="name"
                    placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                  <Input
                    id="phone"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">ডেলিভারি ঠিকানা *</Label>
                  <Textarea
                    id="address"
                    placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন (বাড়ি নং, রাস্তা, এলাকা, জেলা)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>পণ্য নির্বাচন করুন *</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger className="bg-popover">
                        <SelectValue placeholder="পণ্য নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name_bn} - ৳{product.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>পরিমাণ</Label>
                    <Select value={quantity} onValueChange={setQuantity}>
                      <SelectTrigger className="bg-popover">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        {[1, 2, 3, 4, 5].map((q) => (
                          <SelectItem key={q} value={q.toString()}>
                            {q} পিস
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">মোট মূল্য:</span>
                    <span className="text-2xl font-bold text-primary">৳{totalAmount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">ডেলিভারি চার্জ ফ্রি</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "অর্ডার করা হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Trust Badges */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">যোগাযোগ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ফোন / হোয়াটসঅ্যাপ</p>
                    <p className="font-medium">০১৭০০-০০০০০০</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ঠিকানা</p>
                    <p className="font-medium">ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ডেলিভারি</p>
                    <p className="font-medium">৩-৫ কার্যদিবসের মধ্যে</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">আমাদের প্রতিশ্রুতি</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="font-medium">১০০% অরিজিনাল পণ্য</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" />
                  <span className="font-medium">ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-6 h-6 text-primary" />
                  <span className="font-medium">৭ দিনের মানি ব্যাক গ্যারান্টি</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderFormSection;
