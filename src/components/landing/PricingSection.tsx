import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, Shield, Package } from "lucide-react";

const products = [
  {
    name: "তাখফী অয়েল - ১ পিস",
    price: 899,
    originalPrice: 1290,
    savings: "৩০% ছাড়",
    features: [
      "১০০ মিলি বোতল",
      "ফ্রি ডেলিভারি",
      "ক্যাশ অন ডেলিভারি",
      "৭ দিনের মানি ব্যাক গ্যারান্টি",
    ],
    popular: false,
  },
  {
    name: "তাখফী অয়েল - ২ পিস কম্বো",
    price: 1699,
    originalPrice: 2580,
    savings: "৩৫% ছাড়",
    features: [
      "২ x ১০০ মিলি বোতল",
      "ফ্রি ডেলিভারি",
      "ক্যাশ অন ডেলিভারি",
      "৭ দিনের মানি ব্যাক গ্যারান্টি",
      "পরিবারের জন্য সাশ্রয়ী",
    ],
    popular: true,
  },
];

const PricingSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            আজই <span className="text-primary">অর্ডার করুন</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            সারা বাংলাদেশে ফ্রি ডেলিভারি • ক্যাশ অন ডেলিভারি • ৭ দিনের মানি ব্যাক গ্যারান্টি
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${
                product.popular 
                  ? "border-primary shadow-xl scale-105" 
                  : "border-border/50"
              }`}
            >
              {product.popular && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-bl-lg">
                  সবচেয়ে জনপ্রিয়
                </div>
              )}
              <CardHeader className="text-center pb-0">
                <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                <Badge variant="secondary" className="w-fit mx-auto mt-2 bg-accent/10 text-accent border-accent/20">
                  {product.savings}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center mb-6">
                  <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice}</span>
                  <div className="text-4xl font-bold text-primary">৳{product.price}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={scrollToOrder}
                  className="w-full font-semibold py-6"
                  variant={product.popular ? "default" : "outline"}
                >
                  এখনই অর্ডার করুন
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="w-5 h-5 text-primary" />
            <span>সারা দেশে ফ্রি ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="w-5 h-5 text-primary" />
            <span>ক্যাশ অন ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-primary" />
            <span>১০০% অরিজিনাল পণ্য</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
