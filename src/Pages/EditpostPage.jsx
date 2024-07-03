import { useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import DataService from "../Appwrite/Database"
import Container from "../Components/Container"
import PostForm from "../Components/PostForm"
function EditpostPage() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            DataService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditpostPage;