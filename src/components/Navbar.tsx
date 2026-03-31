import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/db";
import { toast } from "sonner";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(auth.getCurrentUser());
  const location = useLocation();
  const navigate = useNavigate();

  // Update user state when location changes (in case of login/logout)
  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Browse Books" },
    { to: "/about", label: "About" },
  ];

  if (user) {
    links.push({ to: "/dashboard", label: "My Portal" });
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    auth.logout();
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-secondary" />
          <span className="font-display text-xl font-bold text-foreground">E-Library</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isActive(link.to) ? "text-secondary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-secondary transition-colors">
                <User className="h-4 w-4" />
                {user.name.split(' ')[0]}
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Log Out</Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${isActive(link.to) ? "text-secondary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>Log Out</Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Log In</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full bg-secondary text-secondary-foreground">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
