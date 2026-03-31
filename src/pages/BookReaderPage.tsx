import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, BookOpen, Clock, Settings, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, auth } from "@/lib/db";
import { toast } from "sonner";
import { Book } from "@/lib/data";

const BookReaderPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fontSize, setFontSize] = useState("text-base");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only allow students to read if logged in
    const user = auth.getCurrentUser();
    if (!user) {
      toast.error("Please login to read books");
      navigate("/login");
      return;
    }

    const books = db.getBooks();
    const foundBook = books.find(b => b.id === bookId);
    
    if (!foundBook) {
      toast.error("Book not found");
      navigate("/catalog");
      return;
    }

    setBook(foundBook);
    
    // Simulate loading/initialization
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [bookId, navigate]);

  const handleExit = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <BookOpen className="h-12 w-12 text-secondary" />
          <h2 className="text-xl font-display font-medium text-foreground">Preparing your book...</h2>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden relative">
      {/* Top Navigation */}
      <header className="flex h-16 items-center justify-between border-b bg-card/50 px-6 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleExit} className="h-9 w-9 p-0 rounded-full hover:bg-muted/50">
            <X className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-sm font-display font-bold text-foreground line-clamp-1">{book.title}</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 mr-4 px-3 py-1 bg-muted/30 rounded-full border border-border/50">
            <Clock className="h-3 w-3 text-secondary" />
            <span className="text-[11px] font-medium text-muted-foreground">Est. 15 min left</span>
          </div>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full" onClick={() => setFontSize(fontSize === "text-base" ? "text-lg" : "text-base")}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Reader Body */}
      <main className="flex-1 overflow-y-auto bg-amber-50/10 dark:bg-zinc-950 px-6 py-12 scroll-smooth">
        <div className={`mx-auto max-w-2xl transition-all duration-300 ${fontSize}`}>
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground/80 mb-2">CHAPTER 1</h2>
            <div className="h-0.5 w-12 bg-secondary mx-auto mb-8"></div>
          </div>
          
          <div className="space-y-6 text-foreground/90 selection:bg-secondary/20 leading-relaxed font-serif">
            <p className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:font-bold first-letter:text-secondary">
              The journey of a thousand pages begins with a single word. In the heart of the digital library, information flows like electricity, powering the dreams of students and researchers alike. Every book is a door, every page a step into a world of knowledge.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
            </p>
            <p>
              Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
            </p>
            <p className="border-l-4 border-secondary/30 pl-6 py-2 italic text-foreground/70 bg-secondary/5 rounded-r-lg">
              "A library is not a luxury but one of the necessities of life."
            </p>
            <p>
              Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tristique sem neque in mi. 
            </p>
          </div>
          
          <div className="mt-20 pt-10 border-t flex items-center justify-between">
            <p className="text-xs text-muted-foreground">© {book.publisher} - {new Date().getFullYear()}</p>
            <p className="text-xs font-medium text-foreground/50">Page {currentPage} of 312</p>
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="flex h-16 items-center justify-center border-t bg-card/80 backdrop-blur-sm px-6">
        <div className="flex items-center gap-8">
          <Button variant="ghost" disabled={currentPage === 1} onClick={() => setCurrentPage(c => Math.max(1, c-1))} className="flex items-center gap-2 group transition-all">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-sm font-medium">Previous Page</span>
          </Button>
          
          <div className="hidden sm:flex h-1.5 w-48 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-secondary transition-all" style={{ width: `${(currentPage / 312) * 100}%` }}></div>
          </div>
          
          <Button variant="ghost" onClick={() => setCurrentPage(c => c+1)} className="flex items-center gap-2 group transition-all">
            <span className="text-sm font-medium">Next Page</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default BookReaderPage;
