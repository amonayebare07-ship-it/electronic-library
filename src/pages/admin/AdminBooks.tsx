import { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/data";
import type { Book } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    category: "Computer Science",
    stock: 1,
    description: "",
  });

  useEffect(() => {
    setBooks(db.getBooks());
  }, []);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      db.addBook(newBook);
      setBooks(db.getBooks());
      toast.success("Book added successfully");
      setOpen(false);
      setNewBook({
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        category: "Computer Science",
        stock: 1,
        description: "",
      });
    } catch (err) {
      toast.error("Failed to add book");
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      db.deleteBook(id);
      setBooks(db.getBooks());
      toast.success("Book deleted successfully");
    }
  };

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Book Inventory</h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddBook}>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Enter the details of the new book to add to the library inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-xs">Title</Label>
                  <Input 
                    id="title" 
                    className="col-span-3" 
                    value={newBook.title}
                    onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right text-xs">Author</Label>
                  <Input 
                    id="author" 
                    className="col-span-3" 
                    value={newBook.author}
                    onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="publisher" className="text-right text-xs text-nowrap">Publisher</Label>
                  <Input 
                    id="publisher" 
                    className="col-span-3" 
                    value={newBook.publisher}
                    onChange={(e) => setNewBook({...newBook, publisher: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isbn" className="text-right text-xs">ISBN</Label>
                  <Input 
                    id="isbn" 
                    className="col-span-3" 
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right text-xs">Category</Label>
                  <Select 
                    onValueChange={(value) => setNewBook({...newBook, category: value})}
                    defaultValue={newBook.category}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.filter(c => c !== "All").map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right text-xs">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number"
                    min="0"
                    className="col-span-3" 
                    value={newBook.stock}
                    onChange={(e) => setNewBook({...newBook, stock: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-secondary text-secondary-foreground">Save Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search books..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Author</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Publisher</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Stock</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((book) => (
                <tr key={book.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{book.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{book.author}</td>
                  <td className="px-4 py-3 text-muted-foreground">{book.publisher}</td>
                  <td className="px-4 py-3 text-muted-foreground">{book.category}</td>
                  <td className="px-4 py-3">
                    <span className={book.stock > 0 ? "text-success" : "text-destructive"}>{book.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="rounded p-1 hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        className="rounded p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(book.id, book.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;
