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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const existingMember = db.getMemberByEmail(email);
    if (existingMember) {
      setTimeout(() => {
        setIsLoading(false);
        toast.error("Email already registered", {
          description: "This email is already in use. Please sign in instead.",
        });
      }, 500);
      return;
    }

    setTimeout(() => {
      try {
        const newUser = db.addMember({ name, email, role: "admin" });
        auth.login(newUser);
        setIsLoading(false);
        toast.success("Admin account created!", {
          description: `Welcome, ${name}!`,
        });
        navigate("/admin");
      } catch (err) {
        setIsLoading(false);
        toast.error("Registration failed. Please try again.");
      }
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Registration</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create your administrator account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="admin-name">Full Name</Label>
            <Input id="admin-name" placeholder="e.g. Mr. Ruhangarinda Brian" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email Address</Label>
            <Input id="admin-email" type="email" placeholder="admin@ksc.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register as Administrator"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignupPage;
