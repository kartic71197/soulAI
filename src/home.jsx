import React from "react";
import { useState, useEffect } from "react";
import soulAI from "./assets/soulai.png";
import { FaEdit } from "react-icons/fa";
import sampleData from "./sampleData.json";
import Sidebar from "./sidebar";

const Home = () => {
  const [currentConvo, setCurrentConvo] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [chatReview, setChatReview] = useState("");

  const askQuestion = () => {
    if (!currentQuestion.trim()) return;
    const match = sampleData.find(
      (item) => item.question.toLowerCase() === currentQuestion.toLowerCase()
    );

    const newMessages = [
      {
        from: "user",
        text: currentQuestion,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        from: "bot",
        text: match ? match.response : "Sorry, Did not understand your query!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
    setCurrentConvo((prev) => [...prev, ...newMessages]);
    setCurrentQuestion("");
  };

  const saveChatToLocalStorage = () => {
    if (currentConvo.length === 0) return;

    const savedChats = JSON.parse(localStorage.getItem("chats") || "[]");
    console.log("savedChats", savedChats);
    const newChat = {
      id: Date.now(),
      conversation: currentConvo,
      review: chatReview,
    };
    console.log("newChat", newChat);
    localStorage.setItem("chats", JSON.stringify([...savedChats, newChat]));

    setChatReview("");
    setCurrentConvo([]);
    setShowReviewModal(false);
  };

  const handleSaveChat = () => {
    setShowReviewModal(true);
  };

  const renderInputSection = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevents page reload
        askQuestion();
      }}
      className="row-span-1 flex justify-center items-center gap-3"
    >
      <div className="flex-1">
        <input
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="bg-white w-full p-3 border border-indigo-300 rounded"
          type="text"
          placeholder="Message Bot AI..."
        />
      </div>
      <button
        type='submit'
        className="bg-indigo-300 py-3 px-6 rounded"
      >
        ASK
      </button>
      <button
        type='button'
        onClick={handleSaveChat}
        className="bg-indigo-300 py-3 px-6 rounded"
      >
        SAVE
      </button>
    </form>
  );
  

  return (
    <div className="grid grid-cols-6 w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="col-span-5 p-3 bg-indigo-100">
        <header>
          <h1 className="text-indigo-400 text-2xl font-bold">Bot AI</h1>
        </header>
        <div className="grid grid-rows-6 h-full">
          {currentConvo.length > 0 ? (
            <div className="row-span-5 overflow-y-auto">
              {currentConvo.map((item, idx) => (
                <div key={idx} className="mb-2 bg-white p-3 rounded shadow">
                  <span>{item.from === "user" ? "You" : "Soul AI"}</span>{" "}
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="row-span-5 flex flex-col justify-center items-center p-6 gap-6">
              <div className="text-2xl font-semibold">
                How Can I Help You Today?
              </div>
              <img
                src={soulAI}
                alt="Soul AI"
                className="w-12 h-12 object-contain rounded-full"
              />
              <div className="grid grid-cols-2 gap-3 w-full">
                {[
                  "Hi, What is the weather",
                  "Hi, What is my Location",
                  "Hi, What is the Temperature",
                  "Hi, How are you",
                ].map((q, i) => (
                  <div
                    key={i}
                    className="px-3 py-6 bg-white shadow-lg rounded cursor-pointer"
                    onClick={() => {
                      setCurrentQuestion(q);
                      askQuestion();
                    }}
                  >
                    <h2 className="font-bold">{q}</h2>
                    <p>Get immediate AI-generated response</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {renderInputSection()}
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3">Review This Chat</h2>
            <textarea
              value={chatReview}
              onChange={(e) => setChatReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows={4}
              placeholder="Write your thoughts about the conversation..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveChatToLocalStorage}
                className="bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
