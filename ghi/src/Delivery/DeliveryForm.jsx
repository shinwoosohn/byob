import React from "react";
import { useState, useEffect } from "react";
import { useCreateRequestMutation } from "../store/requestsApi";
import { useGetAllPostsQuery, useGetPostsQuery } from "../store/postsApi";
import { useGetAllProduceQuery, useGetProduceQuery } from "../store/produceApi";
import { useSelector } from "react-redux";

const DeliveryForm = () => {
  const [post, setPost] = useState("");
  //
  const [produce, setProduce] = useState("");
  const [producer, setProducer] = useState(""); // <<---- Don't need a form input. Set based on post / produce
  //
  const [orderQuantity, setOrderQuantity] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromState, setFromState] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [toCity, setToCity] = useState("");
  const [toState, setToState] = useState("");

  const user = useSelector((state) => state.auth.user);

  const [createRequest, result] = useCreateRequestMutation();

  const { data: postData } = useGetAllPostsQuery();
  const { data: singlePostData } = useGetPostsQuery(post, {
    skip: !post,
  }); // <<---- Use for poster_id = producer_id

  const { data: produceData } = useGetAllProduceQuery(user.user_id, {
    skip: !user.user_id,
  });
  const { data: singleProduceData } = useGetProduceQuery(
    {
      // <<---- if no post: Use for owner_id = producer_id
      user_id: user.user_id,
      produce_id: produce,
    },
    {
      skip: !produce,
    }
  );

  const handlePostChange = (event) => {
    const value = event.target.value;
    setPost(value);
  };

  const handleProduceChange = (event) => {
    const value = event.target.value;
    setProduce(value);
  };

  // const handleProducerChange = (event) => {
  //   const value = event.target.value;
  //   setProducer(value);
  // };

  const handleOrderQuantityChange = (event) => {
    const value = event.target.value;
    setOrderQuantity(value);
  };

  const handleFromAddress = (event) => {
    const value = event.target.value;
    setFromAddress(value);
  };
  const handleFromCity = (event) => {
    const value = event.target.value;
    setFromCity(value);
  };
  const handleFromState = (event) => {
    const value = event.target.value;
    setFromState(value);
  };
  const handleToAddress = (event) => {
    const value = event.target.value;
    setToAddress(value);
  };
  const handleToCity = (event) => {
    const value = event.target.value;
    setToCity(value);
  };
  const handleToState = (event) => {
    const value = event.target.value;
    setToState(value);
  };

  const handleReset = () => {
    setPost("");
    setProduce("");
    setProducer("");
    setFromAddress("");
    setFromCity("");
    setFromState("");
    setToAddress("");
    setToCity("");
    setToState("");
  };

  useEffect(() => {
    if (result.isSuccess) {
      handleReset();
    }
  }, [result.isSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    createRequest({
      posts_id: post,
      produce_id: produce,
      producer_id: producer,
      order_quantity: orderQuantity,
      from_address: fromAddress,
      from_city: fromCity,
      from_state: fromState,
      to_address: toAddress,
      to_city: toCity,
      to_state: toState,
    });
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-9 sm:py-215 lg:max-w-20xl lg:px-8">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create A Delivery Request
            </h1>
            <form onSubmit={handleSubmit} id="create-produce-form">
              <div>
                <select
                  value={post}
                  onChange={handlePostChange}
                  required
                  id="posts"
                  name="posts"
                  className="form-select"
                >
                  <option value="">Choose from all posts</option>
                  {postData.map((post) => {
                    return (
                      <option value={post.post_id} key={post.post_id}>
                        {post.post_id}
                      </option>
                    );
                  })}
                  ;
                </select>
              </div>

              <div>
                <select
                  value={produce}
                  onChange={handleProduceChange}
                  required
                  id="produce"
                  name="produce"
                  className="form-select"
                >
                  <option value="">Choose from your Produce</option>
                  {produceData.map((produce) => {
                    return (
                      <option
                        value={produce.produce_id}
                        key={produce.produce_id}
                      >
                        {produce.name}
                      </option>
                    );
                  })}
                  ;
                </select>
              </div>

              <div>
                <label htmlFor="orderQuantity">Order Quantity</label>
                <input
                  value={orderQuantity}
                  onChange={handleOrderQuantityChange}
                  placeholder="Order Quantity"
                  required
                  type="text"
                  name="orderQuantity"
                  id="orderQuantity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="fromAddress">From Address</label>
                <input
                  value={fromAddress}
                  onChange={handleFromAddress}
                  placeholder="From Address"
                  required
                  type="text"
                  name="fromAddress"
                  id="fromAddress"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="fromCity">From City</label>
                <input
                  value={fromCity}
                  onChange={handleFromCity}
                  placeholder="From City"
                  required
                  type="text"
                  name="fromCity"
                  id="fromCity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="fromState">From State</label>
                <input
                  value={fromState}
                  onChange={handleFromState}
                  placeholder="From State"
                  required
                  type="text"
                  name="fromState"
                  id="fromState"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="toAddress">To Address</label>
                <input
                  value={toAddress}
                  onChange={handleToAddress}
                  placeholder="To Address"
                  required
                  type="text"
                  name="toAddress"
                  id="toAddress"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="toCity">To City</label>
                <input
                  value={toCity}
                  onChange={handleToCity}
                  placeholder="To City"
                  required
                  type="text"
                  name="toCity"
                  id="toCity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="toState">To State</label>
                <input
                  value={toState}
                  onChange={handleToState}
                  placeholder="To State"
                  required
                  type="text"
                  name="toState"
                  id="toState"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Request a Delivery
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
