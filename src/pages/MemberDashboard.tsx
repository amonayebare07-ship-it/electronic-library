import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, Clock, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, auth } from "@/lib/db";
import { toast } from "sonner";
import { Book, BookIssue, Member } from "@/lib/data";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Member | null>(null);
  const [issuedBooks, setIssuedBooks] = useState<(BookIssue & { book?: Book })[]>([]);

  const fetchData = (currentUser: Member) => {
    const allIssues = db.getIssues();
    const userIssues = allIssues.filter(i => i.memberId === currentUser.id);
    const books = db.getBooks();

    const enrichedIssues = userIssues.map(issue => ({
      ...issue,
      book: books.find(b => b.id === issue.bookId)
    }));

    setIssuedBooks(enrichedIssues);
  };

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      toast.error("Please login to access your portal");
      navigate("/login");
      return;
    }
    setUser(currentUser);
    fetchData(currentUser);
  }, [navigate]);

  const handleReturn = (issueId: string, title: string) => {
    if (window.confirm(`Are you sure you want to return "${title}"?`)) {
      db.returnIssue(issueId);
      if (user) fetchData(user);
      toast.success("Book returned", {
        description: "Thank you for returning the book on time!"
      });
    }
  };

  const handleLogout = () => {
    auth.logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-secondary/20 shadow-sm">
            <User className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Student Portal</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-fit flex gap-2">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2 text-secondary">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-semibold text-foreground">Borrowed</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">{issuedBooks.filter(i => !i.returnDate).length}</p>
          <p className="text-xs text-muted-foreground mt-1">Currently in your possession</p>
        </div>
        <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2 text-warning font-semibold">
            <Calendar className="h-5 w-5" />
            <h3 className="text-foreground">Due Soon</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {issuedBooks.filter(i => !i.returnDate && new Date(i.dueDate) < new Date(Date.now() + 3*24*60*60*1000)).length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Due within the next 3 days</p>
        </div>
        <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2 text-success">
            <Clock className="h-5 w-5" />
            <h3 className="font-semibold text-foreground">Readings</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">{issuedBooks.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Total books borrowed to date</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b bg-muted/30">
            <h3 className="font-display font-semibold text-foreground">My Borrowed Books</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/10">
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">Book Details</th>
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">Issued Date</th>
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">Due Date</th>
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {issuedBooks.length > 0 ? (
                  issuedBooks.map((issue) => (
                    <tr key={issue.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{issue.book?.title || "Unknown Book"}</div>
                        <div className="text-xs text-muted-foreground">{issue.book?.author}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{issue.issueDate}</td>
                      <td className="px-6 py-4 text-muted-foreground">{issue.dueDate}</td>
                      <td className="px-6 py-4">
                        {issue.returnDate ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                            Returned on {issue.returnDate}
                          </span>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            new Date(issue.dueDate) < new Date() ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                          }`}>
                            {new Date(issue.dueDate) < new Date() ? "Overdue" : "In Progress"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {!issue.returnDate && (
                          <div className="flex gap-2">
                             <Button size="sm" variant="secondary" onClick={() => navigate(`/read/${issue.bookId}`)} className="text-[10px] h-8 font-bold">
                              Continue Reading
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleReturn(issue.id, issue.book?.title || "")} className="text-[10px] h-8 border-destructive/20 text-destructive hover:bg-destructive/5">
                              Return
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-20" />
                      <p>You haven't borrowed any books yet.</p>
                      <Button variant="link" onClick={() => navigate("/catalog")} className="text-secondary mt-2">
                        Browse the library catalog →
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
