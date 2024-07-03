import { useState,useEffect } from "react";
import { useNavigate,useParams,Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import DataService from "../Appwrite/Database";
import Container from "../Components/Container";
import Button from "../Components/Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
export default function PostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userdata = useSelector((state) => state.userdata);
    useEffect(() => {
        if (slug) {
            DataService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        DataService.deletePost(post.$id).then((status) => {
            if (status) {
                DataService.deleteFile(post.$id);
                navigate("/");
            }
        });
    };
    const extractUserId = (permissions) => {
        for (const permission of permissions) {
            const match = permission.match(/user:(\w+)/);
            if (match) {
                return match[1];
            }
        }
        return null;
    };
    const userId = post ? extractUserId(post.$permissions) : null;
    let isAuthor =false
    if(post && userdata && userdata.userdata){
        isAuthor=(userId===userdata.userdata.$id)
    }
    else if(post && userdata){
        isAuthor=(userId===userdata.$id)
    }
    // console.log(isAuthor)
    // console.log(userdata)
    // console.log(userId)
    return post ? (
        <div className="py-8">
            <Container>
                <div className="relative w-full flex flex-col items-center mb-4 rounded-xl p-2">
                    {isAuthor && (
                        <div className="flex justify-center mb-2 -mt-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className=" bg-green-700 mr-3 font-semibold">
                                ✏️
                                </Button>
                            </Link>
                            <Button bgColor="bg-gray-200" onClick={deletePost} className="font-semibold">
                            ❌
                            </Button>
                        </div>
                    )}
                    <img
                        src={DataService.filePreview(post.image_id)}
                        alt={post.title}
                        className="rounded-3xl mt-4 shadow-4xl border-4 border-gray-600"
                    />
                </div>
                <div className="w-full text-center mb-6">
                    <h1 className="text-2xl text-gray-200 font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-center">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}