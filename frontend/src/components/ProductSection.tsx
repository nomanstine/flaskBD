import { useState } from "react";
import { Check, Droplets, Thermometer, Shield, Clock } from "lucide-react";

// Import all color variants
import flaskBlue from "@/assets/flask-blue.avif";
import flaskBlack from "@/assets/flask-black.avif";
import flaskGray from "@/assets/flask-gray.avif";
import flaskGreen from "@/assets/flask-green.avif";


const colorVariants = [
  { id: "blue", name: "নীল", hex: "#17497e", image: flaskBlue },
  { id: "black", name: "কালো", hex: "#000000", image: flaskBlack },
  { id: "gray", name: "ধূসর", hex: "#3d4046", image: flaskGray },
  { id: "green", name: "সবুজ", hex: "#237b71", image: flaskGreen },
];

const features = [
  { icon: Thermometer, title: "24 Hours Hot", desc: "সারাদিন গরম রাখে" },
  { icon: Droplets, title: "48 Hours Cold", desc: "ঠান্ডা পানীয়ের জন্য" },
  { icon: Shield, title: "Leak Proof", desc: "১০০% লিক-প্রুফ ডিজাইন" },
  { icon: Clock, title: "Durable", desc: "প্রিমিয়াম স্টেইনলেস স্টিল" },
];

interface ProductSectionProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ProductSection = ({ selectedColor, onColorChange }: ProductSectionProps) => {
  const currentVariant = colorVariants.find(v => v.id === selectedColor) || colorVariants[0];

  return (
    <section className="py-16 lg:py-24 bg-background" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">আমাদের প্রিমিয়াম ফ্লাস্ক</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            নিখুঁত ইনসুলেশন প্রযুক্তি সহ আধুনিক ডিজাইন। আপনার পছন্দের রং বেছে নিন।
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Gallery */}
          <div className="space-y-6">
            <div className="bg-secondary rounded-2xl p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden">
              <img 
                src={currentVariant.image} 
                alt={`Thermal Flask - ${currentVariant.name}`} 
                className="max-h-[350px] object-contain transition-all duration-500 transform hover:scale-105"
              />
            </div>
            
            {/* Color Swatches */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground mr-2">রং বেছে নিন:</span>
              {colorVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => onColorChange(variant.id)}
                  className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    selectedColor === variant.id 
                      ? "border-primary scale-110 shadow-lg" 
                      : "border-border hover:border-primary/50 hover:scale-105"
                  }`}
                  style={{ backgroundColor: variant.hex }}
                  title={variant.name}
                >
                  {selectedColor === variant.id && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check className={`w-5 h-5 ${variant.id === 'white' ? 'text-gray-800' : 'text-white'}`} />
                    </span>
                  )}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {variant.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {currentVariant.name} রং
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">প্রিমিয়াম স্টেইনলেস স্টিল থার্মাল ফ্লাস্ক</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">৳ 1,299</span>
                <span className="text-lg text-muted-foreground line-through">৳ 1,999</span>
                <span className="bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-full">
                  35% ছাড়
                </span>
              </div>
              <p className="text-muted-foreground">
                ডাবল-ওয়াল ভ্যাকুয়াম ইনসুলেটেড ফ্লাস্ক দিয়ে প্রিমিয়াম অভিজ্ঞতা নিন। 
                সারাদিন আপনার চা, কফি বা পানি আদর্শ তাপমাত্রায় রাখতে পারফেক্ট।
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                  <feature.icon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications */}
            <div className="bg-muted rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">স্পেসিফিকেশন</h4>
              <ul className="space-y-2">
                {[
                  "ধারণক্ষমতা: ৫০০ মিলি",
                  "উপাদান: ৩০৪ স্টেইনলেস স্টিল",
                  "ওজন: ৩৫০ গ্রাম",
                  "মাপ: ২৫ সেমি x ৭ সেমি",
                  "BPA ফ্রি এবং ফুড গ্রেড",
                ].map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
