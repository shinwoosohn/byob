import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdatePostsMutation } from "../store/postsApi";
import { useGetAllProduceQuery } from "../store/produceApi";
import { useSelector } from "react-redux";

export default function UpdatePostForm() {
  const { posts_id } = useParams();
  const [textState, setTextState] = useState("");
  const [postImgUrl, setPostImgUrl] = useState("");
  const [produce, setProduce] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleTextStateChange = (event) => {
    setTextState(event.target.value);
  };
  const handlePostImgUrlChange = (event) => {
    setPostImgUrl(event.target.value);
  };
  const handleProduceChange = (event) => {
    setProduce(event.target.value);
  };

  const {
    data: produceData,
    isError,
    isLoading,
  } = useGetAllProduceQuery(user.user_id, { skip: !user.user_id });
  console.log("ProduceData", produceData);

  const [updatePost, result] = useUpdatePostsMutation(posts_id);

  const handleReset = () => {
    setTextState("");
    setPostImgUrl("");
    setProduce("");
  };

  useEffect(() => {
    if (result.isSuccess) {
      handleReset();
    }
  }, [result.isSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    updatePost({
      posts_id,
      data: {
        text: textState,
        postimg_url: postImgUrl,
        produce_id: produce,
      },
    });
  };

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
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-9 sm:py-215 lg:max-w-20xl lg:px-8">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Update A Post
            </h1>

            <form onSubmit={handleSubmit} id="update-post-form">
              <div>
                <select
                  value={produce.produce_id}
                  onChange={handleProduceChange}
                  required
                  id="produce"
                  name="produce"
                  className="form-select"
                >
                  <option value="">Choose from your produce</option>
                  {produceData &&
                    produceData.map((singleProduce) => {
                      return (
                        <option
                          key={singleProduce.produce_id}
                          value={singleProduce.produce_id}
                        >
                          {singleProduce.name}
                        </option>
                      );
                    })}
                  ;
                </select>
              </div>

              <div>
                <label htmlFor="text">Post body</label>
                <input
                  value={textState}
                  onChange={handleTextStateChange}
                  placeholder="Write the body of your post here!"
                  required
                  type="text"
                  name="text"
                  id="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="text">Image</label>
                <input
                  value={postImgUrl}
                  onChange={handlePostImgUrlChange}
                  placeholder="Drop an image here!"
                  required
                  type="text"
                  name="postImgUrl"
                  id="postImgUrl"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Update post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
