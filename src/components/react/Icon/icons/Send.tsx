import type { IconProps } from '../Icon';
import styles from './styles.module.css';

export type SendProps = Omit<IconProps, 'type'>;

export function Send({
  height = 24,
  width = 24,
  fillColor = 'var(--bn-icon-fill-color)',
  strokeColor = 'var(--bn-icon-stroke-color)',
  ariaHidden = true,
}: SendProps) {
  return (
    <svg
      className={styles.icon}
      style={
        {
          '--icon-fill-color': fillColor,
          '--icon-stroke-color': strokeColor,
        } as React.CSSProperties
      }
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden={ariaHidden}
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <title>Send</title>
      <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
      <path d="M6 12h16" />
    </svg>
  );
}
