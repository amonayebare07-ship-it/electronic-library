import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLoginPage = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, navigate to admin dashboard
    window.location.href = "/admin";
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-10 w-10 text-secondary" />
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Authorized access only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="adminId">Admin ID</Label>
            <Input id="adminId" placeholder="Enter admin ID" value={adminId} onChange={(e) => setAdminId(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Access Dashboard
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-xs text-muted-foreground hover:text-secondary">
            ← Member Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
