import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

/**
 * AI Chatbot — "Ask about Aslam"
 * Portfolio.md spec: Pre-trained prompt system that can answer about
 * projects, skills, experience, and tech stack.
 */

// Knowledge base for the chatbot
const knowledgeBase = {
  greeting: [
    "Hey! I'm Aslam's AI assistant. Ask me anything about his work, skills, or experience! 🚀",
  ],
  projects: {
    keywords: ["project", "work", "built", "build", "portfolio", "app", "application", "dapp", "try-on", "aura", "dashboard", "financial"],
    responses: [
      "Aslam has built 3 major projects:\n\n🔬 **B2B Virtual Try-On API** — AI-powered image generation with multi-tenant architecture and Stripe billing.\n\n🤖 **AURA (Web3 AI Agent)** — RAG + IPFS memory with smart contract-triggered AI and ERC-721 identity.\n\n📊 **Financial Dashboard API** — RBAC system with JWT auth and Zod validation across 50+ endpoints.",
    ],
  },
  skills: {
    keywords: ["skill", "tech", "technology", "stack", "language", "framework", "tool", "know", "use", "proficient"],
    responses: [
      "Aslam's tech arsenal includes:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS\n**Backend:** Node.js, Express, PostgreSQL, MongoDB\n**Web3:** Solidity, Web3.js, Hardhat, ERC-721\n**AI:** LangChain, RAG pipelines, AI Agents\n**DevOps:** Docker, Nginx, Cloudflare, CI/CD\n\nHe's a rare Web3 + AI hybrid builder! 🔥",
    ],
  },
  experience: {
    keywords: ["experience", "job", "company", "adsup", "freelance", "soulverse", "work history", "career", "year"],
    responses: [
      "Aslam has 2+ years of professional experience:\n\n⚡ **AdsUp Technology** (2024-Present) — Full Stack Developer\n→ 35% faster API response time\n→ 40% less data sync overhead\n→ 25% faster deployments\n\n🔧 **Web Wizards** (2023-2024) — Freelance Developer\n→ 5+ projects delivered\n→ Web3 & dApp integrations\n\n🔗 **Soulverse** (2023-2024) — Junior Web3 Developer\n→ Smart contract development\n→ React UI integration",
    ],
  },
  contact: {
    keywords: ["contact", "hire", "email", "reach", "connect", "linkedin", "github", "available"],
    responses: [
      "You can reach Aslam through:\n\n📧 **Email:** aknankpuria@gmail.com\n🔗 **LinkedIn:** linkedin.com/in/aslam-khan-88a353263\n💻 **GitHub:** github.com/aknankpuria\n\nHe's available for remote work across most timezones! 🌍",
    ],
  },
  about: {
    keywords: ["about", "who", "tell me", "introduce", "background", "aslam"],
    responses: [
      "Aslam Khan is a **Full Stack Developer, Web3 Engineer & AI Integration Specialist** based in Chandigarh, India.\n\nHe's not just a UI dev — he's a **systems thinker** who ships real products. His core identity is building at the intersection of backend systems, Web3 infrastructure, and AI-powered products.\n\nConfident, sharp, minimal — with an elite engineer mindset. 💎",
    ],
  },
  web3: {
    keywords: ["web3", "blockchain", "solidity", "smart contract", "nft", "defi", "decentralized", "crypto", "ethereum"],
    responses: [
      "Aslam's Web3 expertise includes:\n\n🔗 **Solidity** — Smart contract development (ERC-20, ERC-721)\n⛓️ **Web3.js / Ethers.js** — Blockchain interaction\n🔨 **Hardhat** — Testing & deployment\n🤖 **AURA** — His Web3 AI Agent with IPFS memory\n🎨 **NFT Marketplace** — Full dApp with wallet integration\n\nHe bridges traditional web development with decentralized systems.",
    ],
  },
  ai: {
    keywords: ["ai", "artificial intelligence", "langchain", "rag", "agent", "llm", "machine learning", "gpt"],
    responses: [
      "Aslam works with cutting-edge AI:\n\n🧠 **LangChain** — RAG pipelines & AI agents\n🤖 **AURA Project** — Autonomous Web3 AI agent\n📝 **RAG Systems** — Retrieval-augmented generation\n🔗 **AI + Blockchain** — Smart contract-triggered AI responses\n\nThis Web3 + AI combo is a rare and powerful skillset! 🚀",
    ],
  },
};

const defaultResponses = [
  "I can tell you about Aslam's **projects**, **skills**, **experience**, **Web3 work**, **AI expertise**, or how to **contact** him. What interests you?",
  "Try asking about his projects, tech stack, or work experience! I know a lot about what Aslam builds. 💡",
  "I'm best at answering questions about Aslam's work. Ask me about his projects, skills, or career!",
];

const findResponse = (input) => {
  const lower = input.toLowerCase().trim();

  if (lower.length < 2) {
    return "Could you be more specific? Ask about Aslam's projects, skills, experience, or how to contact him!";
  }

  // Check each knowledge category
  for (const [category, data] of Object.entries(knowledgeBase)) {
    if (category === "greeting") continue;
    if (data.keywords.some((kw) => lower.includes(kw))) {
      return data.responses[Math.floor(Math.random() * data.responses.length)];
    }
  }

  // Default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: knowledgeBase.greeting[0],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animate chat open/close
  useEffect(() => {
    if (!chatRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate "thinking" delay
    setTimeout(() => {
      const response = findResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 500 + Math.random() * 800);
  }, [input, isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick suggestions
  const suggestions = ["Projects", "Skills", "Experience", "Web3", "AI", "Contact"];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group"
        style={{
          background: isOpen
            ? "linear-gradient(135deg, #7C3AED 0%, #FF6B35 100%)"
            : "linear-gradient(135deg, #00E5CC 0%, #7C3AED 100%)",
          boxShadow: `0 4px 20px ${isOpen ? "rgba(124,58,237,0.4)" : "rgba(0,229,204,0.4)"}`,
        }}
        aria-label={isOpen ? "Close chatbot" : "Ask about Aslam"}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
        
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-[#00E5CC]/30 animate-ping" />
        )}
      </button>

      {/* "Ask about Aslam" label */}
      {!isOpen && (
        <div className="fixed bottom-[5.5rem] right-6 z-[99] pointer-events-none">
          <span className="text-xs font-mono text-[#00E5CC]/70 bg-black-200/80 px-3 py-1.5 rounded-lg border border-[#00E5CC]/10 backdrop-blur-sm whitespace-nowrap">
            Ask about Aslam ✨
          </span>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 z-[100] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden border border-white/10"
          style={{
            background: "rgba(13,13,26,0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,229,204,0.05)",
          }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00E5CC 0%, #7C3AED 100%)" }}
            >
              <span className="text-sm font-bold text-white">AK</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Ask about Aslam</p>
              <p className="text-[10px] text-[#00E5CC]/60 font-mono">AI Assistant · Always Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto px-4 py-4 space-y-4 chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#00E5CC]/15 text-white rounded-br-md"
                      : "bg-white/[0.04] text-white-800 rounded-bl-md border border-white/5"
                  }`}
                >
                  {/* Render markdown-like bold text */}
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1.5" : ""}>
                      {line.split(/(\*\*.*?\*\*)/).map((part, k) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={k} className="text-[#00E5CC] font-semibold">
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      })}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.04] px-4 py-3 rounded-2xl rounded-bl-md border border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC]/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC]/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC]/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    setTimeout(() => {
                      setMessages((prev) => [...prev, { role: "user", content: s }]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const response = findResponse(s);
                        setMessages((prev) => [
                          ...prev,
                          { role: "assistant", content: response },
                        ]);
                        setIsTyping(false);
                      }, 500 + Math.random() * 800);
                    }, 0);
                    setInput("");
                  }}
                  className="px-3 py-1 rounded-full text-[11px] font-mono text-[#00E5CC]/70 border border-[#00E5CC]/15 hover:border-[#00E5CC]/40 hover:bg-[#00E5CC]/5 transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/[0.04] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white-500/50 focus:outline-none focus:border-[#00E5CC]/30 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30"
                style={{
                  background: input.trim()
                    ? "linear-gradient(135deg, #00E5CC 0%, #7C3AED 100%)"
                    : "rgba(255,255,255,0.05)",
                }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
