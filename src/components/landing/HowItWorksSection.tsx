const steps = [
  {
    number: "১",
    title: "ব্যথার স্থান পরিষ্কার করুন",
    description: "যেখানে ব্যথা অনুভব হচ্ছে সেই স্থান হালকা গরম পানি দিয়ে পরিষ্কার করে মুছে নিন।",
    icon: "🧼",
  },
  {
    number: "২",
    title: "তেল লাগান ও মালিশ করুন",
    description: "পরিমাণমতো তাখফী তেল নিয়ে ব্যথার স্থানে ৫-১০ মিনিট আলতোভাবে মালিশ করুন।",
    icon: "💆",
  },
  {
    number: "৩",
    title: "বিশ্রাম নিন",
    description: "মালিশের পর ১৫-২০ মিনিট বিশ্রাম নিন। দিনে ২-৩ বার ব্যবহার করলে সেরা ফলাফল পাবেন।",
    icon: "😌",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            কিভাবে <span className="text-primary">ব্যবহার</span> করবেন?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            মাত্র ৩টি সহজ ধাপে তাখফী তেল ব্যবহার করে ব্যথা থেকে মুক্তি পান
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step Circle */}
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold shadow-lg relative z-10">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold shadow">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
