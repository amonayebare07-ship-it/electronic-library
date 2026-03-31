import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Shield, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { db, auth } from "@/lib/db";

const LoginPage = () => {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [isStudentLoading, setIsStudentLoading] = useState(false);

  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const navigate = useNavigate();

  // --- Quick Demo Login ---
  const handleQuickStudentLogin = () => {
    setIsStudentLoading(true);
    setTimeout(() => {
      const demoStudent = db.getMembers().find(m => m.role === "student") || db.getMembers()[0];
      if (demoStudent) {
        auth.login(demoStudent);
        toast.success(`Logged in as ${demoStudent.name}`);
        navigate("/dashboard");
      } else {
        toast.error("No student account found.");
      }
      setIsStudentLoading(false);
    }, 500);
  };

  const handleQuickAdminLogin = () => {
    setIsAdminLoading(true);
    setTimeout(() => {
      const mockAdmin = {
        id: "admin-1",
        name: "System Administrator",
        email: "admin@ksc.edu",
        role: "admin" as const,
        status: "active" as const,
        joinDate: "2024-01-01",
      };
      auth.login(mockAdmin);
      toast.success("Admin Portal Accessed");
      navigate("/admin");
      setIsAdminLoading(false);
    }, 500);
  };

  // --- Student Login ---
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsStudentLoading(true);
    setTimeout(() => {
      const members = db.getMembers().filter(m => m.role === "student");
      // Accept any student account regardless of password for easy access
      const user = members.find(m => m.email.toLowerCase() === studentEmail.toLowerCase());
      if (!user) {
        setIsStudentLoading(false);
        toast.error("Account not found", {
          description: "No student account with this email exists.",
        });
        return;
      }
      auth.login(user);
      setIsStudentLoading(false);
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/dashboard");
    }, 600);
  };

  // --- Admin Login ---
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminLoading(true);
    setTimeout(() => {
      const admins = db.getMembers().filter(m => m.role === "admin");
      const user = admins.find(m => m.email.toLowerCase() === adminId.toLowerCase());

      if (!user) {
        // Fallback: allow any "admin" keyword
        if (adminId.toLowerCase().includes("admin")) {
          const mockAdmin = {
            id: "admin-1",
            name: "System Administrator",
            email: adminId,
            role: "admin" as const,
            status: "active" as const,
            joinDate: "2024-01-01",
          };
          auth.login(mockAdmin);
          setIsAdminLoading(false);
          toast.success("Admin Portal Accessed");
          navigate("/admin");
          return;
        }
        setIsAdminLoading(false);
        toast.error("No admin account found with this email.");
        return;
      }

      auth.login(user);
      setIsAdminLoading(false);
      toast.success(`Welcome, ${user.name}!`);
      navigate("/admin");
    }, 600);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row items-stretch bg-background">

      {/* === STUDENT SIDE === */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 border-b lg:border-b-0 lg:border-r bg-card/30">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 ring-2 ring-secondary/20">
              <User className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Student Login</h1>
            <p className="mt-2 text-muted-foreground text-sm">Access your books and reading history</p>
          </div>

          {/* Quick Login Button */}
          <Button
            onClick={handleQuickStudentLogin}
            disabled={isStudentLoading}
            className="w-full h-11 mb-6 bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/30 font-semibold flex items-center justify-center gap-2"
            variant="outline"
          >
            <Zap className="h-4 w-4" />
            Quick Demo Login (Student)
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">or sign in with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleStudentLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentEmail">Email Address</Label>
              <Input
                id="studentEmail"
                type="email"
                placeholder="student@ksc.edu"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentPassword">Password</Label>
              <Input
                id="studentPassword"
                type="password"
                placeholder="Enter any password"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
              disabled={isStudentLoading}
            >
              {isStudentLoading ? "Logging in..." : "Log In"}
              {!isStudentLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to the library?{" "}
            <Link to="/signup" className="text-secondary hover:underline font-bold">Create Account</Link>
          </p>
        </div>
      </div>

      {/* === ADMIN SIDE === */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-primary/[0.02]">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 ring-2 ring-primary/20">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Portal</h1>
            <p className="mt-2 text-muted-foreground text-sm">Access the management dashboard</p>
          </div>

          {/* Quick Admin Login */}
          <Button
            onClick={handleQuickAdminLogin}
            disabled={isAdminLoading}
            className="w-full h-11 mb-6 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 font-semibold flex items-center justify-center gap-2"
            variant="outline"
          >
            <Zap className="h-4 w-4" />
            Quick Demo Login (Admin)
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">or sign in with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminId">Admin Email</Label>
              <Input
                id="adminId"
                placeholder="admin@ksc.edu"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Enter any password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              disabled={isAdminLoading}
            >
              {isAdminLoading ? "Verifying..." : "Log In as Admin"}
              {!isAdminLoading && <Shield className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link to="/admin/signup" className="text-primary hover:underline font-semibold">Register as Admin</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
