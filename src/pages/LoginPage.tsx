import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Shield, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { db, auth } from "@/lib/db";

const LoginPage = () => {
  // Student State
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [isStudentLoading, setIsStudentLoading] = useState(false);

  // Admin State
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const navigate = useNavigate();

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsStudentLoading(true);

    setTimeout(() => {
      const user = db.getMemberByEmail(studentEmail);
      if (!user || user.role !== "student") {
        setIsStudentLoading(false);
        toast.error("Account not found", {
          description: "No student account with this email exists.",
        });
        return;
      }

      auth.login(user);
      setIsStudentLoading(false);
      toast.success("Welcome back!", {
        description: `Logged in as ${user.name}`,
      });
      navigate("/dashboard");
    }, 1200);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminLoading(true);

    setTimeout(() => {
      // In this mock, we'll check if the user exists and has an admin role
      const user = db.getMemberByEmail(adminId);
      
      // For demo purposes, we also allow a hardcoded 'admin' check if needed, 
      // but let's stick to the DB for consistency.
      if (!user || user.role !== "admin") {
        // Fallback for demo ID 'admin'
        if (adminId.toLowerCase() === "admin") {
           const mockAdmin = { id: 'admin-1', name: 'System Admin', email: 'admin@library.com', role: 'admin' as const, status: 'active' as const, joinDate: '2024-01-01' };
           auth.login(mockAdmin);
           setIsAdminLoading(false);
           toast.success("Admin Access Granted");
           navigate("/admin");
           return;
        }

        setIsAdminLoading(false);
        toast.error("Unauthorized Access", {
          description: "Valid Administrator credentials required.",
        });
        return;
      }

      auth.login(user);
      setIsAdminLoading(false);
      toast.success("Administrator Portal Accessed");
      navigate("/admin");
    }, 1200);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row items-stretch bg-background">
      {/* Student Login Side */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 border-b lg:border-b-0 lg:border-r bg-card/30">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="mx-auto h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Student Login</h1>
            <p className="mt-2 text-muted-foreground">Access your books and reading history</p>
          </div>

          <form onSubmit={handleStudentLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="studentEmail">Email Address</Label>
              <Input 
                id="studentEmail" 
                type="email" 
                placeholder="student@example.com" 
                value={studentEmail} 
                onChange={(e) => setStudentEmail(e.target.value)} 
                className="h-11 shadow-sm focus:ring-secondary/50"
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="studentPassword">Password</Label>
                <Link to="#" className="text-xs text-secondary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                id="studentPassword" 
                type="password" 
                placeholder="••••••••" 
                value={studentPassword} 
                onChange={(e) => setStudentPassword(e.target.value)} 
                className="h-11 shadow-sm focus:ring-secondary/50"
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base font-semibold shadow-md transition-all hover:scale-[1.01]"
              disabled={isStudentLoading}
            >
              {isStudentLoading ? "Identifying..." : "Log In as Student"}
              {!isStudentLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <footer className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              New to the library?{" "}
              <Link to="/signup" className="text-secondary hover:underline font-bold">Create Account</Link>
            </p>
          </footer>
        </div>
      </div>

      {/* Admin Login Side */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-primary/[0.02]">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Portal</h1>
            <p className="mt-2 text-muted-foreground">Authorized Management Access Only</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="adminId">Admin Email or ID</Label>
              <Input 
                id="adminId" 
                placeholder="admin@ksc.edu" 
                value={adminId} 
                onChange={(e) => setAdminId(e.target.value)} 
                className="h-11 border-primary/20 focus:ring-primary/50"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Security Password</Label>
              <Input 
                id="adminPassword" 
                type="password" 
                placeholder="••••••••" 
                value={adminPassword} 
                onChange={(e) => setAdminPassword(e.target.value)} 
                className="h-11 border-primary/20 focus:ring-primary/50"
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-md transition-all hover:scale-[1.01]"
              disabled={isAdminLoading}
            >
              {isAdminLoading ? "Verifying..." : "Authorized Login"}
              {!isAdminLoading && <Shield className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <footer className="mt-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Authorized personnel only.
            </p>
            <Link to="/admin/signup" className="block text-sm text-primary hover:underline font-medium">
              Request Admin Access
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
