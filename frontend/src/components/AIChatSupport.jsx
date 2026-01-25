import React, { useState, useEffect, useRef } from 'react';
import { SupportAgent, Send, Close, SmartToy } from '@mui/icons-material';

const AIChatSupport = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: `Hi! I'm your automated assistant for ${product.name}. Ask me about price, warranty, or returns!` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isOpen]);

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('much')) {
            return `The current price for ${product.name} is ₹${product.price.toLocaleString()}. It includes all taxes.`;
        }
        if (lowerQuery.includes('genuine') || lowerQuery.includes('original') || lowerQuery.includes('fake')) {
            return `Yes, ${product.name} is 100% genuine and sourced directly from verified sellers like RetailNet.`;
        }
        if (lowerQuery.includes('warranty') || lowerQuery.includes('guarantee')) {
            return `This product comes with a 1-year brand warranty and 7 days replacement policy.`;
        }
        if (lowerQuery.includes('return') || lowerQuery.includes('exchange') || lowerQuery.includes('replace')) {
            return `We offer a 7-day return policy if the product is damaged or defective.`;
        }
        if (lowerQuery.includes('delivery') || lowerQuery.includes('ship') || lowerQuery.includes('arrive')) {
            return `Delivery typically takes 3-5 business days depending on your location. Shipping is free!`;
        }
        if (lowerQuery.includes('emi') || lowerQuery.includes('installment')) {
            return `Yes, No Cost EMI is available on major credit cards for orders above ₹3,000.`;
        }
        if (lowerQuery.includes('stock') || lowerQuery.includes('available')) {
            return product.stock > 0 ? `Yes, we have ${product.stock} units currently in stock.` : `Sorry, this item is currently out of stock.`;
        }
        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
            return `Hello! How can I assist you with ${product.name} today?`;
        }

        return "I can help with questions about price, warranty, returns, or delivery features. Please ask specific questions!";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = { type: 'bot', text: generateResponse(userMessage.text) };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all z-[1000] flex items-center justify-center group"
                title="AI Support"
            >
                <SupportAgent className="text-3xl" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap ml-0 group-hover:ml-2 text-sm font-bold">
                    AI Support
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-[1000] flex flex-col overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-primary p-4 text-white flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-full">
                                <SmartToy className="text-primary text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Flipkart AI Support</h3>
                                <p className="text-[10px] opacity-80">Demo Mode • Academic Project</p>
                            </div>
                        </div>
                        <button onClick={toggleChat}><Close className="text-white hover:text-gray-200" /></button>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 p-2 text-[10px] text-center text-yellow-800 border-b border-yellow-100">
                        ⚠️ Simulated AI Assistant for Academic Demo Only.
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.type === 'user' ? 'bg-primary text-white rounded-br-none shadow-sm' : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none shadow-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-400 border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm text-xs italic flex items-center gap-1">
                                    <span className="animate-bounce">●</span>
                                    <span className="animate-bounce delay-100">●</span>
                                    <span className="animate-bounce delay-200">●</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            placeholder="Ask about this product..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-primary text-white p-2 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50"
                            disabled={!input.trim()}
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
