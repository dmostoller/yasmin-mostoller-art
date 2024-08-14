import PostsList from "./PostsList"
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import SEO from './SEO.js';


export default function Blog() {

    const { user } = useUser()
    const { isAdmin } = useAdmin()

    return (
        <div className="ui container fluid">
            <SEO
            title="Yasmin Mostoller | News"
            description="Imagination and Emotion"
            name="Yasmin Mostoller"
            type="website"
            image="https://yasminmostoller.com/images/slider2.jpg"
            url="https://yasminmostoller.com/blog"
            />
            <PostsList user={user} isAdmin={isAdmin}/>
        </div>
   )
}