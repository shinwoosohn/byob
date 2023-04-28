import { useGetAllPostsQuery } from "../store/postsApi";
import PostsDetail from "./PostsDetail";

function PostsList() {
  const { data: posts, isError, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div
        classNameName="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p classNameName="font-bold">
          Something went wrong with loading data...
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-6">
      {posts &&
        posts.map((post) => (
          <div key={post.post_created}>
            <PostsDetail singlePost={post} />
          </div>
        ))}
    </div>
  );
}

export default PostsList;
