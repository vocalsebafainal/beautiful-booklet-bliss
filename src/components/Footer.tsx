import { MessageCircle, Mail, Phone, MapPin, Facebook, Youtube, Instagram } from "lucide-react";
import logo from "@/assets/logo.jfif";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Vocalseba" className="w-9 h-9 rounded-full object-cover" />
              <span className="font-bold text-lg">
                <span className="text-primary">Vocal</span><span className="text-secondary">seba</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              বাংলাদেশের সেরা ভয়েসওভার এজেন্সি। প্রফেশনাল কন্ঠশিল্পীদের দিয়ে আপনার কন্টেন্টকে অনন্য করুন।
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">দ্রুত লিংক</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "সেবাসমূহ", href: "#categories" },
                { label: "কিভাবে কাজ করে", href: "#how-it-works" },
                { label: "ডেমো", href: "#demo" },
                { label: "রিভিউ", href: "#reviews" },
                { label: "FAQ", href: "#faq" },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">যোগাযোগ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>+880 1710-922638</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>contact@vocalseba.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">এখনই শুরু করুন</h4>
            <p className="text-muted-foreground text-sm">আপনার প্রজেক্ট নিয়ে আলোচনা করতে আমাদের WhatsApp এ মেসেজ করুন।</p>
            <a
              href="https://wa.me/8801710922638"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[hsl(142,70%,49%)] hover:bg-[hsl(142,70%,42%)] text-white font-semibold transition-all text-sm shadow-lg hover:shadow-xl hover:scale-105"
            >
              <MessageCircle size={18} />
              WhatsApp এ মেসেজ করুন
            </a>
          </div>
        </div>

        <div className="border-t border-border/30 mt-10 pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Vocalseba Agency. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
