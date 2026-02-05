import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Leaf, FlaskConical, Truck } from "lucide-react";
import takhfeeProduct from "@/assets/takhfee-product.png";

const HeroSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              🌿 ১০০% প্রাকৃতিক ভেষজ
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              হাঁটু, কোমর ও{" "}
              <span className="text-primary">জয়েন্টের ব্যথা</span>{" "}
              থেকে মুক্তি পান
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              তাখফী পেইন রিলিফ অয়েল - BCSIR পরীক্ষিত প্রাকৃতিক ভেষজ তেল। 
              মাত্র কয়েক মিনিটে ব্যথা থেকে আরাম পান।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                onClick={scrollToOrder}
                className="text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                এখনই অর্ডার করুন
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })}
                className="text-lg px-8 py-6"
              >
                বিস্তারিত জানুন
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">৭০,০০০+ সন্তুষ্ট গ্রাহক</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">১০০% প্রাকৃতিক</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border">
                <FlaskConical className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">BCSIR পরীক্ষিত</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">ফ্রি ডেলিভারি</span>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative mx-auto w-fit">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl scale-110" />
              <img
                src={takhfeeProduct}
                alt="তাখফী পেইন রিলিফ অয়েল"
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
              />
              {/* Price Badge */}
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-6 py-3 shadow-lg">
                <div className="text-sm line-through opacity-75">৳১২৯০</div>
                <div className="text-2xl font-bold">৳৮৯৯</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
