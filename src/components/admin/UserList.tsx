
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/api/portal";
import { format } from "date-fns";

interface UserListProps {
  users: UserProfile[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>List of all users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>
                  {user.is_admin ? (
                    <Badge className="bg-purple-500">Admin</Badge>
                  ) : (
                    <Badge>Customer</Badge>
                  )}
                </TableCell>
                <TableCell>{user.phone || "Not provided"}</TableCell>
                <TableCell>{user.address || "Not provided"}</TableCell>
                <TableCell>
                  {user.created_at ? format(new Date(user.created_at), "MMM d, yyyy") : "Unknown"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
