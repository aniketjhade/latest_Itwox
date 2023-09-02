import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { AiOutlineFastForward,AiOutlineFastBackward } from 'react-icons/ai';

function DashBoard() {
  const posts = useSelector((state) => state.appConfigReducer.posts);
  const comments = useSelector((state) => state.appConfigReducer.comments);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  function selectPageHandler(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= posts.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  }

  return (
    <div className="w-10/12 mx-auto bg-[#23242a] text-white min-h-screen font-sans">
      <Navbar />
      <h1 className="text-3xl text-center p-4 mb-4">DashBoard</h1>
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer text-center px-4 ">
          {posts.slice(page * 10 - 10, page * 10).map((post, index) => (
            <div 
              className="border rounded-lg overflow-hidden gap-2 p-6 hover:scale-105 hover:backdrop-blur-md transition-transform duration-500 ring-2 ring-green-500 
          md:ring-2 md:ring-green-500 hover:ring-4 md:hover:ring-4 hover:shadow-xl md:hover:shadow-2xl"
              key={index}
            >
              <h1 className="mb-2 font-bold">
                {page * 10 + index - 10 + 1}. {post.title}
              </h1>
              <p className="text-gray-400">{post.body}</p>
              <p>
                <span
                  className="cursor-pointer text-[#00df9a] p-2 "
                  onClick={() => {
                    navigate(`/post/${post.userId}`);
                  }}
                >
                  Comments :
                </span>
                {
                  comments.filter((comment) => post.userId === comment.postId)
                    .length
                }
              </p>
            </div>
          ))}
        </div>
      )}
      {posts.length > 0 && (
        <div className="pagination flex justify-center items-center gap-2 m-4 p-2">
          
          
          <span
            className={`cursor-pointer flex justify-center items-center text-[#00df9a] ${
              page > 1 ? "" : "opacity-0"
            }`}
            onClick={() => selectPageHandler(page - 1)}
          >
           <div className="mr-1"><AiOutlineFastBackward size={24} color="#00df9a" /></div> 
            Previous
          </span>
          {[...Array(posts.length / 10)].map((_, index) => (
            <span
              className={`px-4 py-2 border-white border cursor-pointer ${
                page === index + 1 ? "bg-gray-700" : ""
              }`}
              key={index}
              onClick={() => selectPageHandler(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <span
            className={`cursor-pointer flex justify-center items-center w-[300] text-[#00df9a]${
              page < posts.length / 10 ? "" : "opacity-0"
            }`}
            onClick={() => selectPageHandler(page + 1)}
          >
            Next
           <div className="ml-1"><AiOutlineFastForward size={24} color="#00df9a" /></div> 
          </span>
          

        </div>
      )}
      <Footer />
    </div>
  );
}

export default DashBoard;
