import { Link, useParams } from "react-router-dom";
import { POSTS } from "../data/posts.js";

export default function PostDetailPage() {
    const { postId } = useParams();

    const post = POSTS.find(
        (post) => post.id === Number(postId)
    );

    if (!post) {
        return <h2>Artículo no encontrado</h2>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <Link to="/posts">Volver a la lista de artículos</Link>
        </div>
    );
};

