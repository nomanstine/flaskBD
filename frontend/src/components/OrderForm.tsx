import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ShoppingBag, Truck, CreditCard, Check } from "lucide-react";

// Import all color variants
import flaskBlue from "@/assets/flask-blue.avif";
import flaskBlack from "@/assets/flask-black.avif";
import flaskGray from "@/assets/flask-gray.avif";
import flaskGreen from "@/assets/flask-green.avif";

const colorImages: Record<string, string> = {
  blue: flaskBlue,
  black: flaskBlack,
  gray: flaskGray,
  green: flaskGreen,
};

const colorNames: Record<string, string> = {
  blue: "নীল",
  black: "কালো",
  gray: "ধূসর",
  green: "সবুজ",
};

interface OrderFormProps {
  selectedColor: string;
}

const OrderForm = ({ selectedColor }: OrderFormProps) => {
  const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:8000';
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    paymentMethod: "cod",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const price = 1299;
  const deliveryFee = 0;
  const total = price * formData.quantity + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন");
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("সঠিক মোবাইল নম্বর দিন");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${backendUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          quantity: formData.quantity,
          color: selectedColor,
          payment_method: formData.paymentMethod,
          total_amount: total,
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      console.log('Order created:', result);

      setOrderPlaced(true);
      toast.success("আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!");
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("অর্ডার জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <section className="py-16 lg:py-24 bg-secondary" id="order-section">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center bg-card rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">অর্ডার সফল হয়েছে!</h2>
            <p className="text-muted-foreground mb-6">
              ধন্যবাদ, {formData.name}! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। 
              আপনার অর্ডার ২-৩ দিনের মধ্যে পৌঁছে যাবে।
            </p>
            <Button onClick={() => {
              setOrderPlaced(false);
              setFormData({
                name: "",
                phone: "",
                address: "",
                quantity: 1,
                paymentMethod: "cod",
              });
            }} variant="outline">
              আরেকটি অর্ডার করুন
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-secondary" id="order-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">অর্ডার করুন</h2>
          <p className="text-muted-foreground">সারা বাংলাদেশে ফ্রি ডেলিভারি • ২-৩ দিনে ডেলিভারি</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-4">
                <h3 className="font-semibold text-foreground mb-4">অর্ডার সারাংশ</h3>
                
                <div className="flex gap-4 p-4 bg-muted rounded-xl mb-4">
                  <img src={colorImages[selectedColor]} alt="Flask" className="w-20 h-20 object-contain" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">Premium Thermal Flask</h4>
                    <p className="text-xs text-muted-foreground mb-1">রং: {colorNames[selectedColor]}</p>
                    <p className="text-primary font-semibold">৳ {price.toLocaleString()}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))}
                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{formData.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, quantity: p.quantity + 1 }))}
                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>সাবটোটাল</span>
                    <span>৳ {(price * formData.quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>ডেলিভারি</span>
                    <span className="text-success">ফ্রি</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground text-lg pt-2 border-t border-border">
                    <span>মোট</span>
                    <span className="text-primary">৳ {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-lg space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">আপনার নাম *</Label>
                    <Input
                      id="name"
                      placeholder="সম্পূর্ণ নাম লিখুন"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label>
                    <Textarea
                      id="address"
                      placeholder="বাড়ি নং, রোড, এলাকা, জেলা"
                      value={formData.address}
                      onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="mb-3 block">পেমেন্ট পদ্ধতি</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(p => ({ ...p, paymentMethod: value }))}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="cod"
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === "cod"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="cod" id="cod" />
                      <Truck className="w-5 h-5 text-primary" />
                      <div>
                        <span className="font-medium text-foreground">ক্যাশ অন ডেলিভারি</span>
                        <p className="text-xs text-muted-foreground">পণ্য হাতে পেয়ে পেমেন্ট</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="bkash"
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === "bkash"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="bkash" id="bkash" />
                      <CreditCard className="w-5 h-5 text-accent" />
                      <div>
                        <span className="font-medium text-foreground">বিকাশ/নগদ</span>
                        <p className="text-xs text-muted-foreground">মোবাইল পেমেন্ট</p>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "প্রসেসিং..."
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      অর্ডার কনফার্ম করুন • ৳ {total.toLocaleString()}
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
