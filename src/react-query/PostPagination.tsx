import { useState } from "react";
import usePosts from "./hooks/usePosts";
import usePagination from "./hooks/usePagination";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostPagination = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePagination<Post>(
    { page, pageSize },
    "/posts"
  );
  const posts = data?.data;
  const total = data?.total;
  const totalPages = total ? Math.max(total / pageSize) : 1;

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <button
        className="btn btn-primary my-3 ms-3"
        onClick={() => setPage(page + 1)}
        disabled={totalPages === page}
      >
        Next
      </button>
    </>
  );
};

export default PostPagination;
