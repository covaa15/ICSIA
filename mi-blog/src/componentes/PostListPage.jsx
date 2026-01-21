import { Link } from "react-router-dom";
import { POSTS } from "../data/posts.js";

export default function PostsListPage() {
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {POSTS.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
