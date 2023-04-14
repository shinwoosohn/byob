import { useGetAllPostsQuery } from "../store/postsApi";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "../store/authApi";

const producePost = (post) => {
  if (post.produce.produce_id !== null) {
    return (
      <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div
          class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style="background-image: url('/img/card-left.jpg')"
          title="Woman holding a mug"
        ></div>
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <p class="text-sm text-gray-600 flex items-center">
              <svg
                class="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              {post.produce.exp_date} || {post.produce.is_decorative} ||{" "}
              {post.produce.is_available}
            </p>
            <div class="text-gray-900 font-bold text-xl mb-2">
              <p>Quantity: {post.produce.quantity}</p>
              <p>Weight: {post.produce.weight}</p>
              <p>Description: {post.produce.description}</p>
              <p>Price: {post.produce.price}</p>
            </div>
            <p class="text-gray-700 text-base">{post.text}</p>
          </div>
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src={post.produce.image_url}
              alt={post.produce.description}
            />
            <div class="text-sm">
              <p class="text-gray-900 leading-none">{post.user.username}</p>
              <p class="text-gray-600">{post.post_created}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div
          class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style="background-image: url('/img/card-left.jpg')"
          title="Woman holding a mug"
        ></div>
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <p class="text-gray-700 text-base">{post.text}</p>
          </div>
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src={post.postimg_url}
              alt={post.text}
            />
            <div class="text-sm">
              <p class="text-gray-900 leading-none">{post.user.username}</p>
              <p class="text-gray-600">{post.post_created}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function PostsList() {
  const { data: posts, isError, isLoading } = useGetAllPostsQuery();
  const { token } = useGetTokenQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p className="font-bold">Something went wrong with loading data...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-6">
      {posts.map((post) => producePost(post))}
    </div>
  );
}
