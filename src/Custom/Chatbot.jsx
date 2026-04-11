import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import '../Style/chatbot.scss';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! 👋 Tôi là trợ lý ảo. Hỏi tôi bất cứ điều gì bạn muốn biết.',
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const genAI = useRef(null);
  const model = useRef(null);

  useEffect(() => {
    // Initialize Gemini API
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (apiKey) {
      genAI.current = new GoogleGenerativeAI(apiKey);
      model.current = genAI.current.getGenerativeModel({ model: 'gemini-pro' });
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      if (!model.current) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: '⚠️ Đây là bản demo chưa thể chat',
            sender: 'bot'
          }
        ]);
        setLoading(false);
        return;
      }

      const result = await model.current.generateContent(inputValue);
      const response = await result.response;
      const text = response.text();

      const botMessage = {
        id: Date.now(),
        text: text,
        sender: 'bot'
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `❌ Lỗi: ${error.message}`,
          sender: 'bot'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Trợ lý ảo"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Trợ lý ảo</h3>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message message-${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="message message-bot loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={loading}
              rows="2"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || loading}
              className="send-button"
            >
              {loading ? '⏳' : '📤'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
