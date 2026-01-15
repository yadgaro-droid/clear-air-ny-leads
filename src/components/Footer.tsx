import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="CleanVent Logo" className="h-10" width="64" height="60" />
              <span className="font-bold text-lg">CleanVent</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Professional air duct cleaning services in New York. Improving air quality and HVAC efficiency since 2018.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Air Duct Cleaning</li>
              <li className="text-sm text-muted-foreground">Dryer Vent Cleaning</li>
              <li className="text-sm text-muted-foreground">Chimney Cleaning</li>
              <li className="text-sm text-muted-foreground">HVAC Maintenance</li>
              <li className="text-sm text-muted-foreground">Air Quality Testing</li>
              <li className="text-sm text-muted-foreground">Sanitization Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                <span>16 Sunset RD<br />Demarest, NJ 07627<br />Serving all of NYC</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                <a href="tel:+16465963677" className="hover:text-primary transition-colors">(646) 596-3677</a>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                <a href="mailto:cleanventprofessional@gmail.com" className="hover:text-primary transition-colors">cleanventprofessional@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CleanVent. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
