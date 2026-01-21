import { Button } from "@/components/ui/button";
import { ShoppingBag, Phone } from "lucide-react";

const Header = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold text-foreground">
            Flask<span className="text-primary">BD</span>
          </a>

          <div className="flex items-center gap-4">
            <a 
              href="tel:+8801712345678" 
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              +880 1712-345678
            </a>
            <Button onClick={scrollToOrder} size="sm">
              <ShoppingBag className="w-4 h-4 mr-2" />
              অর্ডার করুন
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
