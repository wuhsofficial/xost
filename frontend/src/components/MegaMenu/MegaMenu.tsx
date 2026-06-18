import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';
import { megaMenuData } from '../../data/megaMenuData';
import styles from './MegaMenu.module.css';

export default function MegaMenu({ activeMenu, alignment = 'left', onMouseLeave }) {
  const content = megaMenuData[activeMenu];

  let positionStyle = { left: 0 };
  if (alignment === 'right') positionStyle = { left: 'auto', right: 0 };
  if (alignment === 'center') positionStyle = { left: '50%', transform: 'translateX(-50%)' };

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
