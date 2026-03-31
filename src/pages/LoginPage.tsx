import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { db, auth } from "@/lib/db";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      // Check if user exists in database
      const user = db.getMemberByEmail(email);
      
      if (!user) {
        setIsLoading(false);
        toast.error("Account not found", {
          description: "No student account with this email exists.",
        });
        return;
      }

      // Track session
      auth.login(user);

      setIsLoading(false);
      toast.success("Welcome back!", {
        description: `Logged in as ${user.name}`,
      });
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <BookOpen className="mx-auto h-10 w-10 text-secondary" />
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your library account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-secondary hover:underline font-medium">Sign up</Link>
          </p>
        </form>

        <div className="mt-4 text-center">
          <Link to="/admin/login" className="text-xs text-muted-foreground hover:text-secondary">
            Admin Login →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
