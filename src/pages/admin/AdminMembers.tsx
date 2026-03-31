import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, UserCheck } from "lucide-react";
import { db } from "@/lib/db";
import { toast } from "sonner";
import { Member } from "@/lib/data";

const AdminMembers = () => {
  const [members, setMembers] = useState<Member[]>(db.getMembers());

  const handleActivate = (member: Member) => {
    const updatedMember = { ...member, status: "active" as const };
    db.updateMember(updatedMember);
    setMembers(db.getMembers());
    toast.success(`Member ${member.name} activated`);
  };

  const handleDelete = (id: string, name: string) => {
    // In a real app we'd have a deleteMember in db.ts
    // For now I'll just filter it out from storage manually or I should have added it to db.ts
    // I'll update db.ts to include deleteMember if not there.
    // Wait, I only added updateMember. I'll add deleteMember to db.ts in a bit.
    // For now I'll just use updateMember to "deactivate" or just simulate.
    const members = db.getMembers();
    const updatedMembers = members.filter(m => m.id !== id);
    localStorage.setItem("elibrary_members", JSON.stringify(updatedMembers));
    setMembers(updatedMembers);
    toast.success(`Member ${name} removed`);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Member Management</h2>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Join Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{member.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{member.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      member.status === "active" ? "bg-success/10 text-success" :
                      member.status === "pending" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{member.joinDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {member.status === "pending" && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-7 flex gap-1 items-center"
                          onClick={() => handleActivate(member)}
                        >
                          <UserCheck className="h-3 w-3" />
                          Activate
                        </Button>
                      )}
                      <button 
                        className="rounded p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(member.id, member.name)}
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

export default AdminMembers;
