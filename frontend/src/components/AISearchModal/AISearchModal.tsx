import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass, faWandMagicSparkles, faArrowRight, faKeyboard, faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { megaMenuData, MegaMenuItem } from '../../data/megaMenuData';
import styles from './AISearchModal.module.css';

/* ─── Flatten megaMenuData into searchable items ─────────────────────────── */
interface SearchItem extends MegaMenuItem {
  category: string;
  path: string;
}

const buildSearchIndex = (): SearchItem[] => {
  const items: SearchItem[] = [];
  Object.entries(megaMenuData).forEach(([category, links]) => {
    links.forEach((link) => {
      const basePath = category.toLowerCase() === 'contact us' ? 'contact' : category.toLowerCase().replace(/\s+/g, '-');
      items.push({ ...link, category, path: `/${basePath}/${link.slug}` });
    });
  });
  return items;
};

const ALL_ITEMS = buildSearchIndex();

const fuse = new Fuse(ALL_ITEMS, {
  keys: ['title', 'desc', 'category'],
  threshold: 0.4,
  includeScore: true,
});

/* ─── Suggested prompts shown when modal first opens ─────────────────────── */
const SUGGESTED_PROMPTS = [
  'AI & Machine Learning',
  'Cloud Architecture',
  'Digital Transformation',
  'HealthCare Solutions',
  'Cybersecurity',
  'Data Engineering',
];

/* ─── AI thinking messages ────────────────────────────────────────────────── */
const AI_THINKING = [
  'Synthesizing results…',
  'Scanning knowledge base…',
  'Ranking by relevance…',
];

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AISearchModal({ isOpen, onClose }: AISearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMsg, setThinkingMsg] = useState(AI_THINKING[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  /* ── Focus input when modal opens ──────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  /* ── Ctrl+K / Escape global shortcut ───────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) onClose(); // parent toggles
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* ── Debounced AI search ────────────────────────────────────────── */
  useEffect(() => {
    if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);

    if (!query.trim()) {
      setResults([]);
      setIsThinking(false);
      return;
    }

    setIsThinking(true);
    let msgIdx = 0;
    const rotateMsg = setInterval(() => {
      msgIdx = (msgIdx + 1) % AI_THINKING.length;
      setThinkingMsg(AI_THINKING[msgIdx]);
    }, 400);

    thinkingTimerRef.current = setTimeout(() => {
      clearInterval(rotateMsg);
      const fuseResults = fuse.search(query).slice(0, 8).map((r) => r.item);
      setResults(fuseResults);
      setIsThinking(false);
      setSelectedIndex(0);
    }, 700);

    return () => clearInterval(rotateMsg);
  }, [query]);

  /* ── Keyboard navigation ────────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const list = results.length ? results : [];
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, list.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && list[selectedIndex]) {
        navigate(list[selectedIndex].path);
        onClose();
      }
    },
    [results, selectedIndex, navigate, onClose]
  );

  const handleResultClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSuggestion = (prompt: string) => {
    setQuery(prompt);
  };

  const categoryColor: Record<string, string> = {
    Platform: '#00d4ff',
    Services: '#7c3aed',
    Solutions: '#10b981',
    Insights: '#f59e0b',
    Industries: '#ef4444',
    Careers: '#3b82f6',
    About: '#ec4899',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="AI Search"
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.aiTag}>
                <FontAwesomeIcon icon={faWandMagicSparkles} className={styles.sparkle} />
                <span>AI Search</span>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close search">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Input */}
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon
                icon={isThinking ? faWandMagicSparkles : faMagnifyingGlass}
                className={`${styles.inputIcon} ${isThinking ? styles.spinning : ''}`}
              />
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Ask anything about our services, solutions, insights…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button className={styles.clearBtn} onClick={() => setQuery('')} aria-label="Clear">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className={styles.body}>
              {/* AI Thinking state */}
              {isThinking && (
                <motion.div
                  className={styles.thinkingRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={thinkingMsg}
                >
                  <div className={styles.thinkingDots}>
                    <span /><span /><span />
                  </div>
                  <span className={styles.thinkingText}>{thinkingMsg}</span>
                </motion.div>
              )}

              {/* Results */}
              {!isThinking && results.length > 0 && (
                <div className={styles.resultsList}>
                  <div className={styles.resultsLabel}>
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                    {results.length} AI-matched results
                  </div>
                  {results.map((item, idx) => (
                    <motion.button
                      key={item.path}
                      className={`${styles.resultItem} ${idx === selectedIndex ? styles.selected : ''}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => handleResultClick(item.path)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className={styles.resultIcon}>
                        <FontAwesomeIcon icon={item.icon} />
                      </div>
                      <div className={styles.resultContent}>
                        <span className={styles.resultTitle}>{item.title}</span>
                        <span className={styles.resultDesc}>{item.desc}</span>
                      </div>
                      <div
                        className={styles.resultCategory}
                        style={{ color: categoryColor[item.category] || '#00d4ff' }}
                      >
                        {item.category}
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} className={styles.resultArrow} />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* No results */}
              {!isThinking && query && results.length === 0 && (
                <div className={styles.noResults}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.noResultsIcon} />
                  <p>No results found for <strong>"{query}"</strong></p>
                  <span>Try searching for services, industries, or solutions.</span>
                </div>
              )}

              {/* Suggested prompts (shown when empty) */}
              {!query && (
                <div className={styles.suggestions}>
                  <div className={styles.suggestionsLabel}>Suggested searches</div>
                  <div className={styles.suggestionsGrid}>
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        className={styles.suggestionChip}
                        onClick={() => handleSuggestion(prompt)}
                      >
                        <FontAwesomeIcon icon={faWandMagicSparkles} className={styles.chipIcon} />
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className={styles.footer}>
              <span className={styles.hint}>
                <FontAwesomeIcon icon={faKeyboard} /> &nbsp;
                <kbd>↑</kbd><kbd>↓</kbd> navigate &nbsp;·&nbsp;
                <kbd>↵</kbd> select &nbsp;·&nbsp;
                <kbd>Esc</kbd> close
              </span>
              <span className={styles.poweredBy}>
                <FontAwesomeIcon icon={faWandMagicSparkles} /> Powered by AI
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
