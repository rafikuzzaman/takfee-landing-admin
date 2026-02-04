import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "রহিমা বেগম",
    location: "ঢাকা",
    rating: 5,
    text: "৫ বছর ধরে হাঁটুর ব্যথায় ভুগছিলাম। অনেক ওষুধ খেয়েছি কিন্তু কাজ হয়নি। তাখফী তেল ব্যবহারের ১ সপ্তাহের মধ্যে অনেক ভালো অনুভব করছি।",
    avatar: "র",
  },
  {
    name: "আব্দুল করিম",
    location: "চট্টগ্রাম",
    rating: 5,
    text: "কোমরের ব্যথায় অফিসে বসতে পারতাম না। তাখফী তেল আমার জীবন বদলে দিয়েছে। এখন স্বাভাবিক জীবনযাপন করতে পারছি।",
    avatar: "আ",
  },
  {
    name: "ফাতেমা খাতুন",
    location: "রাজশাহী",
    rating: 5,
    text: "আমার মায়ের বাতের ব্যথা ছিল অনেক দিন ধরে। তাখফী তেল দিয়ে মালিশ করার পর এখন অনেক ভালো আছেন। ধন্যবাদ তাখফী!",
    avatar: "ফ",
  },
  {
    name: "মোস্তফা হোসেন",
    location: "সিলেট",
    rating: 5,
    text: "কাঁধে ফ্রোজেন শোল্ডার ছিল। হাত তুলতে পারতাম না। তাখফী তেল নিয়মিত ব্যবহারে এখন সম্পূর্ণ সুস্থ।",
    avatar: "ম",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            গ্রাহকদের <span className="text-primary">মতামত</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            হাজারো সন্তুষ্ট গ্রাহক তাখফী তেল ব্যবহার করে সুফল পেয়েছেন
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <span className="text-sm text-muted-foreground">• {testimonial.location}</span>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
