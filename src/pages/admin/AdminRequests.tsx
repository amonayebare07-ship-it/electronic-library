import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Inbox } from "lucide-react";
import { toast } from "sonner";

const AdminRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const members = db.getMembers();

  const fetchRequests = () => {
    const allRequests = db.getRequests();
    // Sort by pending first, then by date
    const sorted = [...allRequests].sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
    });
    setRequests(sorted);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = (id: string, status: "fulfilled" | "cancelled") => {
    db.updateRequestStatus(id, status);
    fetchRequests();
    toast.success(`Request ${status === "fulfilled" ? "marked as fulfilled" : "cancelled"}`);
  };

  const getMemberName = (id: string) => {
    return members.find(m => m.id === id)?.name || "Unknown Student";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Student Book Requests</h1>
        <p className="text-muted-foreground text-sm">Review and manage book requests and restock alerts from students.</p>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-6 py-4 text-left font-semibold">Book Details</th>
                <th className="px-6 py-4 text-left font-semibold">Requested By</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{req.bookTitle}</div>
                      <div className="text-xs text-muted-foreground">{req.author} • {req.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{getMemberName(req.memberId)}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{req.requestDate}</td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant="outline" 
                        className={`capitalize font-bold text-[10px] ${
                          req.status === "pending" ? "bg-warning/10 text-warning border-warning/20" :
                          req.status === "fulfilled" ? "bg-success/10 text-success border-success/20" :
                          "bg-destructive/10 text-destructive border-destructive/20"
                        }`}
                      >
                        {req.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleStatusUpdate(req.id, "fulfilled")}
                            className="h-8 w-8 p-0 text-success hover:bg-success/5"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleStatusUpdate(req.id, "cancelled")}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/5"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground">
                    <Inbox className="h-12 w-12 mx-auto mb-4 opacity-10" />
                    <p className="text-lg font-medium">No requests yet</p>
                    <p>New student requests will appear here once submitted.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;
