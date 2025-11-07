import { Icon } from '../Icon/Icon';
import type { IconTypes } from '../Icon/Icon';
import styles from './styles.module.css';

interface ButtonProps {
  children: React.ReactNode;
  icon?: IconTypes;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  ariaBusy?: boolean;
}

// TODO: Add loading status with spinner

export function Button({
  children,
  icon,
  onClick,
  disabled,
  ariaBusy,
}: ButtonProps) {
  const paddingStart = icon ? 'var(--bn-spacing-8)' : 'var(--bn-spacing-16)';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-busy={ariaBusy}
      className={styles.button}
      style={
        {
          '--padding-start': paddingStart,
        } as React.CSSProperties
      }
    >
      {icon && <Icon type={icon} />}
      {children}
    </button>
  );
}
