import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/data";
import { db, auth } from "@/lib/db";
import { toast } from "sonner";

const CatalogPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const books = db.getBooks();

  const handleReadNow = (bookId: string) => {
    const user = auth.getCurrentUser();
    
    if (!user) {
      toast.error("Sign in to read", {
        description: "You must be a member to access library books.",
        action: {
          label: "Login",
          onClick: () => navigate("/login")
        }
      });
      return;
    }

    // Check if book is already borrowed by this user
    const issues = db.getIssues();
    const alreadyBorrowed = issues.find(i => i.memberId === user.id && i.bookId === bookId && !i.returnDate);

    if (!alreadyBorrowed) {
      // Auto-borrow the book
      db.addIssue({
        memberId: user.id,
        bookId: bookId,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days
      });
      toast.success("Book borrowed", {
        description: "Checking out your book for 14 days."
      });
    }

    navigate(`/read/${bookId}`);
  };

  const handleRequestStock = (book: any) => {
    const user = auth.getCurrentUser();
    if (!user) {
      toast.error("Sign in to request books");
      return;
    }

    db.addRequest({
      memberId: user.id,
      bookTitle: book.title,
      author: book.author,
      category: book.category,
    });

    toast.success("Restock request submitted", {
      description: `We'll notify you when ${book.title} is available.`
    });
  };

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({ title: "", author: "", category: "All" });

  const handleManualRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.getCurrentUser();
    if (!user) {
      toast.error("Sign in to submit requests");
      return;
    }

    db.addRequest({
      memberId: user.id,
      bookTitle: requestData.title,
      author: requestData.author,
      category: requestData.category,
    });

    toast.success("Book request submitted", {
      description: "Our librarians will look for this book."
    });
    setShowRequestForm(false);
    setRequestData({ title: "", author: "", category: "All" });
  };

  const filtered = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || book.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Book Catalog</h1>
        <p className="mt-2 text-muted-foreground">Browse our complete collection of books</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                category === cat
                  ? "bg-secondary text-secondary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((book) => (
          <div key={book.id} className="group flex flex-col rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-xl hover:border-secondary/40 hover:-translate-y-1">
            <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
              <span className="font-display text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-all transform group-hover:scale-110">
                {book.title.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <Badge variant="secondary" className="mb-3 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                {book.category}
              </Badge>
              <h3 className="font-display text-base font-bold text-foreground line-clamp-2 group-hover:text-secondary transition-colors leading-tight mb-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground font-medium">{book.author}</p>
              <p className="text-xs text-muted-foreground/60">{book.publisher}</p>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${book.stock > 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                  {book.stock > 0 ? `${book.stock} Available` : "Out of stock"}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold">ISBN: {book.isbn.slice(-4)}</span>
              </div>
              <Button 
                onClick={() => handleReadNow(book.id)}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm flex gap-2 font-bold py-5"
                disabled={book.stock <= 0}
              >
                <BookOpen className="h-4 w-4" />
                Read Now
              </Button>
              {book.stock <= 0 && (
                <Button 
                  onClick={() => handleRequestStock(book)}
                  variant="outline"
                  className="w-full border-secondary text-secondary hover:bg-secondary/5 text-xs h-9"
                >
                  Request Restock
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="flex justify-center text-muted-foreground opacity-20">
            <BookOpen className="h-20 w-20" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Book Not Found</h3>
            <p className="text-muted-foreground">It seems we don't have the book you're looking for yet.</p>
          </div>
          <Button 
            onClick={() => setShowRequestForm(true)}
            className="bg-secondary text-secondary-foreground"
          >
            Request this Book
          </Button>
        </div>
      )}

      {/* Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold mb-4">Request a Book</h2>
            <form onSubmit={handleManualRequest} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Book Title</label>
                <Input 
                  placeholder="e.g. The Great Gatsby" 
                  value={requestData.title} 
                  onChange={(e) => setRequestData({...requestData, title: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <Input 
                  placeholder="e.g. F. Scott Fitzgerald" 
                  value={requestData.author} 
                  onChange={(e) => setRequestData({...requestData, author: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={requestData.category}
                  onChange={(e) => setRequestData({...requestData, category: e.target.value})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setShowRequestForm(false)} className="flex-1">Cancel</Button>
                <Button type="submit" className="flex-1 bg-secondary text-secondary-foreground font-bold">Submit Request</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
