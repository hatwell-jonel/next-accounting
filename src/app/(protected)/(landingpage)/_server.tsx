import { getUsers } from "./_actions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ActionButtons } from "./_client"

export const UserData = async () => {
    const users = await getUsers();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>username</TableHead>
                    <TableHead>email</TableHead>
                    <TableHead>status</TableHead>
                    <TableHead>role</TableHead>
                    <TableHead>actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    users.map((user) => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.active ? 'active' : 'inactive'}> 
                                        {user.active ? "active" : "inactive"}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <ActionButtons id={user.id} />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}


// LOADING ANIMATION
// import { Loader2 } from "lucide-react"
// <Loader2 className="mr-2 h-4 w-4 animate-spin" />