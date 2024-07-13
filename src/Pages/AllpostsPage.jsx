import { useEffect, useState } from "react";
import DataService from "../Appwrite/Database";
import Container from "../Components/Container";
import PostPreview from "../Components/PostPreview";

function AllpostsPage(){
    const [posts,setPosts]=useState([])
    useEffect(()=>{},[])
    DataService.listPosts().then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((post)=>(
                            <div key={post.$id} className="p-2 w-1/4 transform transition-all duration-300 hover:scale-105">
                                <PostPreview {...post}/>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
export default AllpostsPage;
