// import React, { useState } from "react";
// import {useCreatePostsMutation } from "../store/postsApi";
// import { useGetAllProduceQuery } from "../store/produceApi";

// export default function PostsForm(){
//     const [textState, setTextState] = useState('')
//     const [postImgUrl, setPostImgUrl] = useState('')
//     const [produceList, setProduceList] = useState([])
//     const [produce, setProduce] = useState('')
//     // ^^^ needs to connect to the useGetAllProduceQuery on line 22
//     const handleTextStateChange = (event) => {
//         setTextState(event.target.value)
//     }
//     const handlePostImgUrlChange = (event) => {
//         setPostImgUrl(event.target.value)
//     }
//     const handleProduceChange = (event) => {
//         setProduce(event.target.value)
//     }

//   // ------------------------ for ref ------------------------
// // class PostsIn(BaseModel):
//     // text: str
//     // postimg_url: str
//     // produce_id: Optional[int]
//     // poster_id: Optional[int]

// // ????????????????????????? no clue what im doing on below lol i thing Garret mentioned we needed everything from queries ??????????????
//     // const { data: posts, isError, isLoading, text, postimg_url, produce_id, poster_id } = useCreatePostsMutation();
//     const { data: produceData} = useGetAllProduceQuery();
//         setProduceList(produceData)

//     const [createPost, result] = useCreatePostsMutation();

//     const handleReset = () => {
//         setTextState("");
//         postImgUrl("");
//         setProduceList("");
//         setProduce("");
//     };

//     useEffect(() => {
//         if (result.isSuccess) {
//             handleReset();
//         }
//     }, [result.isSuccess]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         createPost(user_id, {
//             text: textState,
//             postimg_url: postImgUrl,
//             produce_id: produce.id,
//             poster_id: imageUrl,
//     });
//   };


//     if (isLoading) {
//         return <div>Loading...</div>;
//     }
//     if (isError) {
//         return (
//             <div
//                 className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
//                 role="alert"
//             >
//                 <p className="font-bold">Something went wrong with loading data...</p>
//             </div>
//         );
//     }
//     return (
//         <div className="mx-auto max-w-xl px-4 py-16 sm:px-9 sm:py-215 lg:max-w-20xl lg:px-8">
//             <div className="row">
//                 <div className="offset-3 col-6">
//                     <div className="shadow p-4 mt-4">

//                         <h1 className="text-2xl font-bold tracking-tight text-gray-900">
//                             Create A Post
//                         </h1>

//                         <form onSubmit={handleSubmit} id="create-post-form">

//                             <div>
//                                 <select value={produce.description} onChange={handleProduceChange} required id="produce" name="produce" className="form-select">
//                                     <option value="">Choose from your produce</option>
//                                     {produceList.map(singleProduce => {
//                                         return (
//                                             <option value={singleProduce.name} key={singleProduce.produce_id}>
//                                                 {singleProduce.name}
//                                             </option>
//                                         );
//                                     })};
//                                 </select>
//                             </div>

//                             <div>
//                                 <label htmlFor="text">Post body</label>
//                                 <input
//                                     value={textState}
//                                     onChange={handleTextStateChange}
//                                     placeholder="Write the body of your post here!"
//                                     required
//                                     type="text"
//                                     name="text"
//                                     id="text"
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="text">Image</label>
//                                 <input
//                                     value={postImgUrl}
//                                     onChange={handlePostImgUrlChange}
//                                     placeholder="Write the body of your post here!"
//                                     required
//                                     type="text"
//                                     name="postingImgUrl"
//                                     id="postingImgUrl"
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
//                             >
//                                 Create this post
//                             </button>

//                         </form>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
