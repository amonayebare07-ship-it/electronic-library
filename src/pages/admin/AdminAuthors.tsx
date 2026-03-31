import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminAuthors = () => {
  const authors = [
    { id: "1", name: "Thomas H. Cormen", books: 3 },
    { id: "2", name: "Abraham Silberschatz", books: 2 },
    { id: "3", name: "Robert C. Martin", books: 5 },
    { id: "4", name: "Donald E. Knuth", books: 4 },
    { id: "5", name: "Andrew S. Tanenbaum", books: 2 },
    { id: "6", name: "Stuart Russell", books: 1 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Author Management</h2>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Author
        </Button>
      </div>
      <div className="rounded-lg border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Books</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.books}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="rounded p-1 hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                    <button className="rounded p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAuthors;
