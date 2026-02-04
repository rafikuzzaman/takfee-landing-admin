import { Facebook, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">ত</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">তাখফী</h3>
                <p className="text-sm text-background/70">পেইন রিলিফ অয়েল</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              তাখফী পেইন রিলিফ অয়েল - BCSIR পরীক্ষিত প্রাকৃতিক ভেষজ তেল। 
              হাঁটু, কোমর ও জয়েন্টের ব্যথায় কার্যকর সমাধান।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#benefits" className="text-background/70 hover:text-background transition-colors">
                  উপকারিতা
                </a>
              </li>
              <li>
                <a href="#order-form" className="text-background/70 hover:text-background transition-colors">
                  অর্ডার করুন
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  রিফান্ড পলিসি
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  আমাদের সম্পর্কে
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">যোগাযোগ</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-background/70">
                <Phone className="w-4 h-4" />
                <span>০১৭০০-০০০০০০</span>
              </div>
              <div className="flex gap-3 mt-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} তাখফী। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
