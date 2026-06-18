import styles from './SectionTitle.module.css';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

/**
 * SectionTitle — gradient heading with an optional centered subtitle.
 */
export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
