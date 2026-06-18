import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import styles from './AnimatedCounter.module.css';

export interface AnimatedCounterProps {
  endValue: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

/**
 * AnimatedCounter — counts up from 0 to endValue when scrolled into view.
 */
export default function AnimatedCounter({ endValue, label, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const { ref, value } = useAnimatedCounter(endValue);

  return (
    <div ref={ref} className={styles.container}>
      <span className={styles.number}>
        {prefix}{value}{suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
