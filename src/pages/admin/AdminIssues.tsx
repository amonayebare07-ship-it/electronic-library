const AdminIssues = () => {
  const issues = [
    { id: "1", book: "Introduction to Algorithms", member: "John Mukasa", issueDate: "2025-01-10", dueDate: "2025-02-10", status: "issued" },
    { id: "2", book: "Clean Code", member: "Grace Atuhaire", issueDate: "2025-01-15", dueDate: "2025-02-15", status: "issued" },
    { id: "3", book: "Design Patterns", member: "Sarah Namuli", issueDate: "2024-12-01", dueDate: "2025-01-01", status: "returned" },
    { id: "4", book: "Computer Networks", member: "John Mukasa", issueDate: "2024-11-20", dueDate: "2024-12-20", status: "overdue" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Book Issues</h2>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Book</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Member</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Issue Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Due Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{issue.book}</td>
                  <td className="px-4 py-3 text-muted-foreground">{issue.member}</td>
                  <td className="px-4 py-3 text-muted-foreground">{issue.issueDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{issue.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      issue.status === "issued" ? "bg-secondary/10 text-secondary" :
                      issue.status === "returned" ? "bg-success/10 text-success" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {issue.status}
                    </span>
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

export default AdminIssues;
