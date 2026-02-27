import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';

const SUGGESTIONS = [
  "How much water should I drink daily?",
  "Best 10-min workout for beginners?",
  "How do I fix my sleep schedule?",
  "Quick high-protein meal ideas?",
  "Simple breathing exercise for stress?",
  "How to lose weight sustainably?",
  "How to build muscle at home?",
  "Is coffee bad for health?",
  "How many steps should I walk daily?",
  "Foods that improve focus and memory?",
];

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! Ask me anything about your health.", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const msgText = text || inputText;
    if (!msgText.trim()) return;

    // Hide suggestions once user starts chatting
    setShowSuggestions(false);

    const userMsg = { id: Date.now(), text: msgText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5005/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, text: data.reply, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "⚠️ Backend connection error. Make sure server is running.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div className="bot-info">
          <div className="bot-avatar">🤖</div>
          <div className="bot-details">
            <p className="bot-name">Gemini Health Agent</p>
            <span className="bot-status"><span className="status-dot"></span> Online</span>
          </div>
        </div>
        <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(m => (
          <div key={m.id} className={`message-wrapper ${m.sender}`}>
            <div className="message-bubble">{m.text}</div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="message-wrapper bot">
            <div className="message-bubble">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Suggestion chips — only shown at start */}
        {showSuggestions && (
          <div className="suggestions-grid">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <input
          className="chat-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about health..."
        />
        <button onClick={() => handleSend()} disabled={!inputText.trim()} className="send-btn">➤</button>
      </div>
    </div>
  );
};

export default Chatbot;
