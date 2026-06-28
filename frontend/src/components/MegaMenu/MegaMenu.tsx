import { useState, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';
import { megaMenuData } from '../../data/megaMenuData';
import styles from './MegaMenu.module.css';

export default function MegaMenu({ 
  activeMenu, 
  targetRect, 
  onMouseLeave 
}: { 
  activeMenu: string; 
  targetRect: DOMRect | null; 
  onMouseLeave: () => void; 
}) {
  const content = megaMenuData[activeMenu];
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftPosition, setLeftPosition] = useState(-9999); // hidden until calculated

  useLayoutEffect(() => {
    if (containerRef.current && targetRect) {
      const width = containerRef.current.offsetWidth;
      const screenWidth = window.innerWidth;
      
      // Center relative to the hovered nav item
      let desiredLeft = targetRect.left + (targetRect.width / 2) - (width / 2);
      
      // Clamp to screen edges to prevent right-side cutting off
      desiredLeft = Math.max(16, Math.min(desiredLeft, screenWidth - width - 16));
      
      setLeftPosition(desiredLeft);
    }
  }, [activeMenu, targetRect]);

  const positionStyle = {
    left: leftPosition === -9999 ? 0 : leftPosition,
    opacity: leftPosition === -9999 ? 0 : 1, // hide until positioned
    top: '100%'
  };

  return (
    <AnimatePresence>
      {activeMenu && content && (
        <>
            {createPortal(
              <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              />,
              document.body
            )}
            <div className={styles.megaMenuPositioner} style={positionStyle}>
              <motion.div
                ref={containerRef}
                className={styles.megaMenuContainer}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
            <div className={styles.megaMenuInner}>
              <div className={styles.grid}>
                {content.map((item, idx) => {
                  const basePath = activeMenu.toLowerCase() === 'contact us' 
                    ? 'contact' 
                    : activeMenu.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link
                      key={idx}
                      to={`/${basePath}/${item.slug}`}
                      className={styles.gridItem}
                      onClick={onMouseLeave} // close menu on click
                    >
                    <div className={styles.iconWrapper}>
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div className={styles.textContent}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <p className={styles.itemDesc}>{item.desc}</p>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
