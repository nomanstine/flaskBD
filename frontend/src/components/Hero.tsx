import flask1 from "@/assets/flask-1.avif";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Hero = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-secondary via-background to-muted">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm">🇧🇩 বাংলাদেশে ফ্রি ডেলিভারি</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Premium <span className="text-primary">Thermal Flask</span> for Your Daily Life
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Keep your beverages hot for 24 hours or cold for 48 hours. Perfect for office, travel, and outdoor adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={scrollToOrder}
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                অর্ডার করুন
              </Button>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-3xl font-bold text-foreground">৳ 1,299</span>
                <span className="text-lg text-muted-foreground line-through">৳ 1,999</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
              <span className="flex items-center gap-1">✓ Cash on Delivery</span>
              <span className="flex items-center gap-1">✓ 7 Days Return</span>
              <span className="flex items-center gap-1">✓ 1 Year Warranty</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl"></div>
              <img 
                src={flask1} 
                alt="Premium Thermal Flask" 
                className="relative w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
