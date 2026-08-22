import { useState } from "react";
import "./Chatbot.css";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [quotation, setQuotation] = useState<any>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! 👋 I'm the Happy Technologies AI Assistant. How can I help you today?",
    },
  ]);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const userMessage: Message = {
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await fetch("https://happy-technologies-backend.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get chatbot response");
      }

      const data = await response.json();
      if (data.quotation) {
  setQuotation(data.quotation);
}

      const botMessage: Message = {
        sender: "bot",
        text: data.reply || "Sorry, I could not understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm unable to connect right now. Please try again later.",
        },
      ]);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const downloadQuotation = async () => {
  if (!quotation) return;

  try {
    const response = await fetch(
      "https://happy-technologies-backend.onrender.com/api/quotation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quotation,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Unable to download quotation"
      );
    }

    const blob = await response.blob();

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "Happy-Technologies-Quotation.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "Quotation download error:",
      error
    );
  }
};

  return (
    <div className="chatbot">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <strong>Happy Technologies</strong>

              <div className="assistant-status">
                AI Assistant
                <span className="status-dot"></span>
              </div>
            </div>

            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* ADD DOWNLOAD BUTTON HERE */}
{quotation && (
  <div className="quotation-actions">
    <button
      className="download-quotation-btn"
      onClick={downloadQuotation}
    >
      📄 Download Quotation
    </button>
  </div>
)}

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;