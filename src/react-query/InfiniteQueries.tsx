import { useState } from "react";
import { Post } from "./hooks/usePosts";
import useInfinite from "./hooks/useInfinite";
import React from "react";

const InfiniteQueries = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfinite<Post>({ pageSize }, "/posts");
  const posts = data;

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Loadmore"}
      </button>
    </>
  );
};

export default InfiniteQueries;
