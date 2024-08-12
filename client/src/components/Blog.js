import PostsList from "./PostsList"
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"

export default function Blog() {

    const { user } = useUser()
    const { isAdmin } = useAdmin()

    return (
       <div className="ui container fluid"><PostsList user={user} isAdmin={isAdmin}/></div>
   )
}