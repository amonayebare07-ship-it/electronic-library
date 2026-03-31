import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span className="font-display text-lg font-bold">E-Library</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Kinkizi Stewards College Electronic Library Management System. Transforming traditional libraries into digital excellence.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/catalog" className="hover:text-secondary transition-colors">Browse Books</Link>
              <Link to="/login" className="hover:text-secondary transition-colors">Member Login</Link>
              <Link to="/signup" className="hover:text-secondary transition-colors">Sign Up</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <p>Department of Science & Technology</p>
              <p>Kinkizi Stewards College</p>
              <p>2024-2025</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/50">
          © 2025 E-Library Management System. All rights reserved. Developed by Akibua Mathias.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
