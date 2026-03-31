import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Users, FileText, UserCog, LayoutDashboard, LogOut, BookCopy } from "lucide-react";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/books", label: "Books", icon: BookOpen },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/issues", label: "Book Issues", icon: BookCopy },
  { to: "/admin/authors", label: "Authors", icon: FileText },
  { to: "/admin/publishers", label: "Publishers", icon: UserCog },
];

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-sidebar text-sidebar-foreground transition-all ${collapsed ? "w-16" : "w-60"} flex flex-col`}>
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <BookOpen className="h-6 w-6 text-sidebar-primary shrink-0" />
          {!collapsed && <span className="font-display text-sm font-bold">E-Library Admin</span>}
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {adminLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-2">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && "Back to Site"}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center px-6">
          <button onClick={() => setCollapsed(!collapsed)} className="mr-4 text-muted-foreground hover:text-foreground text-sm">
            ☰
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-6 bg-background overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
