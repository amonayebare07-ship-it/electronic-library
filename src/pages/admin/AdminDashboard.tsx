import { BookOpen, Users, BookCopy, AlertTriangle } from "lucide-react";
import { db } from "@/lib/db";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="rounded-lg border bg-card p-5">
    <div className="flex items-center gap-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const books = db.getBooks();
  const members = db.getMembers();
  
  const totalBooksCount = books.length;
  const totalStock = books.reduce((sum, b) => sum + b.stock, 0);
  const activeMembers = members.filter((m) => m.status === "active").length;
  const pendingMembers = members.filter((m) => m.status === "pending").length;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Total Books" value={String(totalBooksCount)} color="bg-secondary/10 text-secondary" />
        <StatCard icon={Users} label="Active Members" value={String(activeMembers)} color="bg-primary/10 text-primary" />
        <StatCard icon={BookCopy} label="Books in Stock" value={String(totalStock)} color="bg-success/10 text-success" />
        <StatCard icon={AlertTriangle} label="Pending Members" value={String(pendingMembers)} color="bg-warning/10 text-warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Books */}
        <div className="rounded-lg border bg-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Books</h3>
          <div className="space-y-3">
            {books.slice(-5).reverse().map((book) => (
              <div key={book.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-foreground">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
                <span className="text-xs text-muted-foreground">{book.stock} in stock</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Members */}
        <div className="rounded-lg border bg-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Members</h3>
          <div className="space-y-3">
            {members.slice(-5).reverse().map((member) => (
              <div key={member.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  member.status === "active" ? "bg-success/10 text-success" :
                  member.status === "pending" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
