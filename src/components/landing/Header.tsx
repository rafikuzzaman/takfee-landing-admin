import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Header = () => {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">ত</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">তাখফী</h1>
              <p className="text-xs text-muted-foreground">পেইন রিলিফ অয়েল</p>
            </div>
          </div>

          {/* Contact & CTA */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:+8801700000000" 
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">০১৭০০-০০০০০০</span>
            </a>
            <Button onClick={scrollToOrder} className="font-semibold">
              অর্ডার করুন
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
