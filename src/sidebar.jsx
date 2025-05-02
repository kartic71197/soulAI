import React from "react";
import soulAI from "./assets/soulai.png";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const Sidebar = () => {
  return (
    <div className="col-span-1 bg-white">
      <Link to="/">
        <div className="bg-indigo-300 p-3 font-semibold flex justify-around items-center gap-3">
          <img
            src={soulAI}
            alt="Soul AI"
            className="w-8 h-8 object-contain rounded-full"
          />
          New Chat
          <FaEdit />
        </div>
      </Link>
      <div className="p-3">
        <Link to="/history">
          <div className="p-2 font-semibold flex justify-around items-center gap-3 bg-indigo-300 rounded-lg">
            Past conversations
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
