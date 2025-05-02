import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";

const History = () => {
  // Use an empty array as initial state
  const [savedChats, setSavedChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    loadChatsFromStorage();
  }, []);

  // Function to load chats from localStorage
  const loadChatsFromStorage = () => {
    setLoading(true);
    try {
      // Get raw data from localStorage
      const rawData = localStorage.getItem("chats");
      console.log("Raw localStorage data:", rawData);

      if (rawData) {
        // Parse the JSON data
        const parsedChats = JSON.parse(rawData);
        console.log("Successfully parsed chats:", parsedChats);

        // Directly set the state with the parsed data
        setSavedChats(parsedChats);
      } else {
        console.log("No chats found in localStorage");
        setSavedChats([]);
      }
    } catch (error) {
      console.error("Error loading chats:", error);
      setSavedChats([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to manually refresh the data
  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    loadChatsFromStorage();
  };

  console.log("Current savedChats state:", savedChats);

  return (
    <div className="grid grid-cols-6 w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="col-span-5 p-3 bg-indigo-100 overflow-y-auto">
        <header>
          <h1 className="text-indigo-400 text-2xl font-bold">Bot AI</h1>
        </header>

        {loading ? (
          <div className="flex justify-center p-4">
            <p>Loading chats...</p>
          </div>
        ) : savedChats.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <p>No saved chats found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedChats.map((chat, idx) => (
              <div key={chat.id} className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold text-lg mb-2">
                  Chat #{idx + 1} - ID: {chat.id}
                </h2>
                <div className="space-y-1 mb-2 max-h-48 overflow-y-auto border border-gray-200 p-2 rounded">
                  {chat.conversation &&
                    chat.conversation.map((msg, i) => (
                      <div
                        key={i}
                        className={`text-sm p-1 ${
                          msg.from === "user" ? "bg-gray-50" : "bg-indigo-50"
                        } rounded`}
                      >
                        <strong>
                          {msg.from === "user" ? "You:" : "Soul AI:"}
                        </strong>{" "}
                        <div>{msg.text}</div>
                        {msg.time && (
                          <span className="text-xs text-gray-500 ml-2">
                            {msg.time}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
                {chat.review && (
                  <p className="italic text-gray-600 bg-gray-50 p-2 rounded">
                    Review: {chat.review}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
