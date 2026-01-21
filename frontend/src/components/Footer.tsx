import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FlaskBD</h3>
            <p className="text-background/70">
              বাংলাদেশের সেরা কোয়ালিটির থার্মাল ফ্লাস্ক। আপনার পছন্দের পানীয় গরম বা ঠান্ডা রাখুন সারাদিন।
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">যোগাযোগ</h4>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+8801712345678" className="hover:text-background transition-colors">
                  +880 1712-345678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@flaskbd.com" className="hover:text-background transition-colors">
                  info@flaskbd.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                ঢাকা, বাংলাদেশ
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">নীতিমালা</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">রিটার্ন পলিসি</a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">শিপিং পলিসি</a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">প্রাইভেসি পলিসি</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/50 text-sm">
          <p>© {new Date().getFullYear()} FlaskBD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
