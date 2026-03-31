import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { db, auth } from "@/lib/db";

const AdminSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple security check for demo
    if (adminCode !== "ADMIN123") {
      setTimeout(() => {
        setIsLoading(false);
        toast.error("Invalid Admin Access Code", {
          description: "Please enter the correct authorization code.",
        });
      }, 800);
      return;
    }

    // Check if email already exists
    const existingMember = db.getMemberByEmail(email);
    if (existingMember) {
      setTimeout(() => {
        setIsLoading(false);
        toast.error("Email already registered", {
          description: "Please use a different email or sign in.",
        });
      }, 800);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      try {
        const newUser = db.addMember({ name, email, role: "admin" });
        auth.login(newUser); // Automatically log in
        
        setIsLoading(false);
        toast.success("Admin Account created successfully!", {
          description: "Welcome to the Admin Portal!",
        });
        navigate("/admin");
      } catch (err) {
        setIsLoading(false);
        toast.error("Failed to create account. Please try again.");
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Admin Registration</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create your administrator account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6 border-primary/20">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Administrator Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="admin@ksc.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminCode">Access Code</Label>
            <Input 
              id="adminCode" 
              type="password" 
              placeholder="Enter ADMIN123" 
              value={adminCode} 
              onChange={(e) => setAdminCode(e.target.value)} 
              required 
            />
            <p className="text-[10px] text-muted-foreground italic">Tip: Use ADMIN123 for demo access</p>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating Admin Account..." : "Register as Admin"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-primary hover:underline font-medium">Admin Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignupPage;
