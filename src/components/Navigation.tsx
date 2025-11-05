import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xl">NY</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">NY Duct Cleaning</span>
              <span className="text-xs text-muted-foreground">Professional Air Care</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+15555382532" className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              (555) 538-2532
            </a>
            <Button asChild>
              <Link to="/contact">Get Free Estimate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary px-4 py-2 ${
                    isActive(link.path) ? "text-primary bg-primary-light rounded-lg" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-border space-y-3">
                <a href="tel:+15555382532" className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 538-2532
                </a>
                <Button asChild className="w-full">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Get Free Estimate</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
