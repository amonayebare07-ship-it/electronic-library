import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPublishers = () => {
  const publishers = [
    { id: "1", name: "MIT Press", location: "Cambridge, MA", books: 4 },
    { id: "2", name: "McGraw Hill", location: "New York, NY", books: 6 },
    { id: "3", name: "Prentice Hall", location: "Upper Saddle River, NJ", books: 3 },
    { id: "4", name: "Addison-Wesley", location: "Boston, MA", books: 5 },
    { id: "5", name: "Pearson", location: "London, UK", books: 8 },
    { id: "6", name: "Wiley", location: "Hoboken, NJ", books: 4 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Publisher Management</h2>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Publisher
        </Button>
      </div>
      <div className="rounded-lg border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Location</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Books</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.location}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.books}</td>
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

export default AdminPublishers;
