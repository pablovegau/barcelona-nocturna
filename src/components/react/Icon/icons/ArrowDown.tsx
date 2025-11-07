import type { IconProps } from '../Icon';
import styles from './styles.module.css';

export type ArrowDownProps = Omit<IconProps, 'type'>;

export function ArrowDown({
  height = 24,
  width = 24,
  fillColor = 'var(--bn-icon-fill-color)',
  strokeColor = 'var(--bn-icon-stroke-color)',
  ariaHidden = true,
}: ArrowDownProps) {
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
    >
      <title>Arrow Down</title>
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        stroke-linecap="round"
        stroke-width="2"
      />

      <line
        x1="7"
        y1="14"
        x2="12"
        y2="19"
        stroke-linecap="round"
        stroke-width="2"
      />

      <line
        x1="17"
        y1="14"
        x2="12"
        y2="19"
        stroke-linecap="round"
        stroke-width="2"
      />
    </svg>
  );
}
