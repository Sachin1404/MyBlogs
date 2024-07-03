import { useEffect,useState } from "react";
import DataService from "../Appwrite/Database";
import Container from "../Components/Container";
import PostPreview from "../Components/PostPreview";
import { useSelector } from "react-redux";
function HomePage() {
    const [posts, setPosts] = useState([])
    const userdata=useSelector((state)=>state.userdata)
    const status=useSelector((state)=>state.status)
    useEffect(() => {
        DataService.listPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    const extractUserId = (permissions) => {
        for (const permission of permissions) {
            const match = permission.match(/user:(\w+)/);
            if (match) {
                return match[1];
            }
        }
        return null;
    };
    const newposts=posts.filter((post)=>{
        const userId = post ? extractUserId(post.$permissions) : null;
        let isAuthor =false
    if(post && userdata && userdata.userdata){
        isAuthor=(userId===userdata.userdata.$id)
    }
    else if(post && userdata){
        isAuthor=(userId===userdata.$id)
    }
        if(isAuthor){
            return post
        }
    })
    if (!status) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-500 hover:text-white">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (newposts.length===0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-500 hover:text-white">
                                Feel free to post!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {newposts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 transform transition-all duration-300 hover:scale-105'>
                            <PostPreview {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default HomePage;