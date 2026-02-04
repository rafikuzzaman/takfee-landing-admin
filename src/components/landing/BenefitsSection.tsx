import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: "🦵",
    title: "হাঁটুর ব্যথা",
    description: "বয়সজনিত বা আঘাতজনিত হাঁটুর ব্যথায় দ্রুত আরাম দেয়",
  },
  {
    icon: "🔙",
    title: "কোমরের ব্যথা",
    description: "দীর্ঘক্ষণ বসে থাকা বা ভারী কাজে কোমরের ব্যথা দূর করে",
  },
  {
    icon: "💪",
    title: "কাঁধের ব্যথা",
    description: "ফ্রোজেন শোল্ডার ও কাঁধের জড়তা দূর করতে সাহায্য করে",
  },
  {
    icon: "🤲",
    title: "জয়েন্টের ব্যথা",
    description: "হাত-পায়ের জয়েন্টের ব্যথা ও প্রদাহ কমাতে কার্যকর",
  },
  {
    icon: "🦴",
    title: "বাতের ব্যথা",
    description: "আর্থ্রাইটিস ও বাতজনিত ব্যথায় প্রাকৃতিক সমাধান",
  },
  {
    icon: "⚡",
    title: "পেশীর ব্যথা",
    description: "মাংসপেশীর টান ও ক্লান্তি দূর করে শক্তি জোগায়",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            তাখফী তেলের <span className="text-primary">উপকারিতা</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            প্রাকৃতিক ভেষজ উপাদান দিয়ে তৈরি তাখফী তেল বিভিন্ন ধরনের ব্যথায় কার্যকর
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
