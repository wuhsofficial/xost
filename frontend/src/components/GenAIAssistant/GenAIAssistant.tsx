import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles, faPaperPlane, faXmark, faMinus, faRobot, faUser
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import styles from './GenAIAssistant.module.css';

/* ─── Knowledge base for smart responses ────────────────────────────────── */
const AI_KNOWLEDGE: Record<string, string> = {
  default:
    "Hi! I'm XOST AI, your digital transformation guide. I can help you explore our **services**, **solutions**, **industries** we serve, or answer questions about **working with us**. What would you like to know?",
  services:
    "XOST offers a full suite of tech services:\n\n• **Enterprise & Software Development**: Custom business-grade applications\n• **Cloud Architecture & Migration**: AWS, Azure, GCP strategy & execution\n• **AI & Machine Learning Integration**: Intelligent automation pipelines\n• **Data Engineering & Analytics**: Real-time dashboards & data lakes\n• **Cybersecurity & Risk Management**: Zero-trust architecture\n• **Academic & FYP Solutions**: End-to-end student project support\n\nWould you like details on any specific service?",
  platform:
    "Our platform is built on four pillars:\n\n• **Core Architecture**: Cloud-native, microservices-first\n• **Integration & APIs**: REST, GraphQL, event-driven\n• **Security & Compliance**: SOC2, GDPR, HIPAA-ready\n• **Scale & Performance**: Auto-scaling global infrastructure\n\nThis ensures enterprise-grade reliability from day one.",
  solutions:
    "We deliver strategic technology solutions:\n\n• **Digital Transformation**: Modernize your entire tech stack\n• **Enterprise Automation**: RPA and workflow orchestration\n• **Cloud Cost Optimization**: Reduce infra spend by up to 40%\n• **Data-driven Decision Making**: BI dashboards and predictive analytics",
  ai:
    "Our AI & ML capabilities include:\n\n• **Generative AI integration** into your existing products\n• **Semantic search** and NLP pipelines\n• **Predictive analytics** and recommendation engines\n• **Computer Vision** for industrial automation\n• **LLM fine-tuning** on your proprietary data\n\nWe make AI practical, not just experimental.",
  healthcare:
    "In HealthCare & Life Sciences, we build:\n\n• **HIPAA-compliant** patient management systems\n• **Telemedicine platforms** with real-time video\n• **Clinical data pipelines** for research\n• **AI diagnostic tools** for radiology and pathology",
  fintech:
    "In Fintech & Banking, we deliver:\n\n• **Core banking modernization** on cloud\n• **Real-time fraud detection** with ML\n• **Open Banking APIs** (PSD2 compliant)\n• **Digital wallet & payment gateways**\n• **Regulatory reporting automation**",
  contact:
    "You can reach us at:\n\n📧 **hello@xost.agency**\n📞 **+1 (555) 000-0000**\n📍 **Innovation Hub, Tech City**\n\nOr click **Contact Us** in the top navigation to send us a direct message. We typically respond within 24 hours!",
  pricing:
    "Our pricing is fully customized based on your project scope, timeline, and complexity.\n\nWe offer:\n• **Fixed-price** engagements for well-defined projects\n• **Time & Material** for agile/evolving requirements\n• **Retainer models** for ongoing development\n\nWould you like to schedule a free 30-min consultation to get an estimate?",
};

const resolveResponse = (message: string): string => {
  const msg = message.toLowerCase();
  if (msg.includes('service') || msg.includes('offer') || msg.includes('do you')) return AI_KNOWLEDGE.services;
  if (msg.includes('platform') || msg.includes('architecture') || msg.includes('infrastructure')) return AI_KNOWLEDGE.platform;
  if (msg.includes('solution') || msg.includes('transform') || msg.includes('automat')) return AI_KNOWLEDGE.solutions;
  if (msg.includes('ai') || msg.includes('machine learning') || msg.includes('ml') || msg.includes('gpt') || msg.includes('llm')) return AI_KNOWLEDGE.ai;
  if (msg.includes('health') || msg.includes('medical') || msg.includes('hospital')) return AI_KNOWLEDGE.healthcare;
  if (msg.includes('fintech') || msg.includes('bank') || msg.includes('finance') || msg.includes('payment')) return AI_KNOWLEDGE.fintech;
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || msg.includes('phone')) return AI_KNOWLEDGE.contact;
  if (msg.includes('price') || msg.includes('cost') || msg.includes('budget') || msg.includes('quote')) return AI_KNOWLEDGE.pricing;
  return "That's a great question! I'd recommend reaching out to our team directly at **hello@xost.agency** for a tailored answer. Or try asking about our **services**, **solutions**, **AI capabilities**, or **specific industries**; I know those really well!";
};

/* ─── Suggested prompt chips ────────────────────────────────────────────── */
const SUGGESTED = [
  'What services do you offer?',
  'Tell me about your AI capabilities',
  'How can I contact you?',
  'Fintech solutions?',
];

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  typing?: boolean;
}

export default function GenAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'ai', text: AI_KNOWLEDGE.default },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Scroll to bottom ────────────────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* ── Focus input when opened ──────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  /* ── Dispatch custom event on open state change ───────────────────── */
  useEffect(() => {
    const event = new CustomEvent('xost-assistant-toggle', { detail: { isOpen } });
    window.dispatchEvent(event);
  }, [isOpen]);

  /* ── Simulate AI "typing" response ──────────────────────────────── */
  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Delay for "thinking"
    setTimeout(() => {
      const responseText = resolveResponse(text);
      const aiMsg: Message = { id: Date.now().toString() + '_ai', role: 'ai', text: '' };
      setMessages((prev) => [...prev, aiMsg]);

      // Stream text word-by-word
      const words = responseText.split(' ');
      let wordIdx = 0;
      const interval = setInterval(() => {
        wordIdx++;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            text: words.slice(0, wordIdx).join(' '),
          };
          return updated;
        });
        if (wordIdx >= words.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 35);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  /* ── Render message with markdown-like bold ──────────────────────── */
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className={styles.fab}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open AI Assistant"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FontAwesomeIcon icon={faMinus} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FontAwesomeIcon icon={faWandMagicSparkles} />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && <span className={styles.fabPulse} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.botAvatar}>
                  <Logo variant="icon-only" size={20} />
                  <span className={styles.onlineDot} />
                </div>
                <div>
                  <div className={styles.botName}>XOST AI</div>
                  <div className={styles.botStatus}>
                    <span className={styles.statusDot} />
                    {isTyping ? 'Generating response…' : 'Online · Ready to help'}
                  </div>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className={styles.messages}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.role === 'ai' && (
                    <div className={styles.msgAvatar}>
                      <Logo variant="icon-only" size={16} />
                    </div>
                  )}
                  <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                    {renderText(msg.text)}
                    {msg.role === 'ai' && msg.text === '' && (
                      <div className={styles.typingDots}>
                        <span /><span /><span />
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className={`${styles.msgAvatar} ${styles.userAvatar}`}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Global typing indicator */}
              {isTyping && messages[messages.length - 1]?.text === '' && null}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length === 1 && (
              <div className={styles.suggestions}>
                {SUGGESTED.map((s) => (
                  <button key={s} className={styles.chip} onClick={() => sendMessage(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form className={styles.inputArea} onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Ask me anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                autoComplete="off"
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!input.trim() || isTyping}
                aria-label="Send"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>

            {/* Powered by tag */}
            <div className={styles.poweredBy}>
              <FontAwesomeIcon icon={faWandMagicSparkles} /> Powered by Gen AI · XOST Intelligence
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
