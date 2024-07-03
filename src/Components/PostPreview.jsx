import DataService from "../Appwrite/Database";
import { Link } from "react-router-dom";
function PostPreview({$id,title,image_id,authorname}){
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={DataService.filePreview(image_id)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-2xl font-bold text-center'
            >{title}</h2>
            <p className='text-center text-gray-600 mt-1 text-sm font-semibold'>
                    Posted by{" "}
                    <span>
                        {authorname}
                    </span>
                </p>
        </div>
        </Link>
    )
}
export default PostPreview;