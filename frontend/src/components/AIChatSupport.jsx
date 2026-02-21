// AI Chat Support — a simulated chatbot widget that answers
// basic questions about the currently viewed product.
// Note: This is a demo-only feature for academic purposes.

import React, { useState, useEffect, useRef } from 'react';
import { SupportAgent, Send, Close, SmartToy } from '@mui/icons-material';

// Response delay (ms) to mimic a typing effect
const TYPING_DELAY = 1500;

// Maps common question keywords to contextual answers
const buildReply = (query, product) => {
    const normalizedQuery = query.toLowerCase();

    const RESPONSE_MAP = [
        { keywords: ['price', 'cost', 'much'], reply: `The current price for ${product.name} is ₹${product.price.toLocaleString()}. It includes all taxes.` },
        { keywords: ['genuine', 'original', 'fake'], reply: `Yes, ${product.name} is 100% genuine and sourced directly from verified sellers.` },
        { keywords: ['warranty', 'guarantee'], reply: 'This product comes with a 1-year brand warranty and 7 days replacement policy.' },
        { keywords: ['return', 'exchange', 'replace'], reply: 'We offer a 7-day return policy if the product is damaged or defective.' },
        { keywords: ['delivery', 'ship', 'arrive'], reply: 'Delivery typically takes 3-5 business days depending on your location. Shipping is free!' },
        { keywords: ['emi', 'installment'], reply: 'Yes, No Cost EMI is available on major credit cards for orders above ₹3,000.' },
        { keywords: ['stock', 'available'], reply: product.stock > 0 ? `Yes, we have ${product.stock} units currently in stock.` : 'Sorry, this item is currently out of stock.' },
        { keywords: ['hello', 'hi', 'hey'], reply: `Hello! How can I assist you with ${product.name} today?` },
    ];

    // Find the first matching keyword set
    const match = RESPONSE_MAP.find(({ keywords }) =>
        keywords.some((kw) => normalizedQuery.includes(kw))
    );

    return match?.reply || 'I can help with questions about price, warranty, returns, or delivery. Please ask specific questions!';
};

const AIChatSupport = ({ product }) => {
    const [chatOpen, setChatOpen] = useState(false);
    const [conversation, setConversation] = useState([
        { sender: 'bot', text: `Hi! I'm your automated assistant for ${product.name}. Ask me about price, warranty, or returns!` },
    ]);
    const [userInput, setUserInput] = useState('');
    const [botTyping, setBotTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll to the newest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation, chatOpen]);

    const sendMessage = () => {
        const trimmed = userInput.trim();
        if (!trimmed) return;

        // Add the user's message immediately
        setConversation((prev) => [...prev, { sender: 'user', text: trimmed }]);
        setUserInput('');
        setBotTyping(true);

        // Simulate bot thinking time
        setTimeout(() => {
            const reply = buildReply(trimmed, product);
            setConversation((prev) => [...prev, { sender: 'bot', text: reply }]);
            setBotTyping(false);
        }, TYPING_DELAY);
    };

    return (
        <>
            {/* Floating toggle button */}
            <button
                onClick={() => setChatOpen(!chatOpen)}
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all z-[1000] flex items-center justify-center group"
                title="AI Support"
            >
                <SupportAgent className="text-3xl" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap ml-0 group-hover:ml-2 text-sm font-bold">
                    AI Support
                </span>
            </button>

            {/* Chat panel */}
            {chatOpen && (
                <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-[1000] flex flex-col overflow-hidden animate-fade-in-up">
                    {/* Panel header */}
                    <div className="bg-primary p-4 text-white flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-full">
                                <SmartToy className="text-primary text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Lumina AI Support</h3>
                                <p className="text-[10px] opacity-80">Demo Mode • Academic Project</p>
                            </div>
                        </div>
                        <button onClick={() => setChatOpen(false)}>
                            <Close className="text-white hover:text-gray-200" />
                        </button>
                    </div>

                    {/* Disclaimer banner */}
                    <div className="bg-yellow-50 p-2 text-[10px] text-center text-yellow-800 border-b border-yellow-100">
                        ⚠️ Simulated AI Assistant for Academic Demo Only.
                    </div>

                    {/* Conversation area */}
                    <div className="flex-1 h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                        {conversation.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-none shadow-sm'
                                        : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {botTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-400 border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm text-xs italic flex items-center gap-1">
                                    <span className="animate-bounce">●</span>
                                    <span className="animate-bounce delay-100">●</span>
                                    <span className="animate-bounce delay-200">●</span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Message input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            placeholder="Ask about this product..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-primary text-white p-2 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50"
                            disabled={!userInput.trim()}
                        >
                            <Send className="text-sm ml-0.5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatSupport;
