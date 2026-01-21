import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedColor, setSelectedColor] = useState("blue");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductSection 
          selectedColor={selectedColor} 
          onColorChange={setSelectedColor} 
        />
        <OrderForm selectedColor={selectedColor} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
