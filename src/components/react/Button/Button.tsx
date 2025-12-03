import clsx from 'clsx';

import { Icon } from '../Icon/Icon';
import type { IconTypes } from '../Icon/Icon';
import styles from './styles.module.css';

interface ButtonProps {
  children?: React.ReactNode;
  icon?: IconTypes;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
  disabled?: boolean;
  ariaBusy?: boolean;
  /*
    primary: Solid color background, one of the base colors
    secondary: Solid color background, a gray color
    tertiary: Blurred background, a gray color. With border
    ghost: No background, text color is one of the base colors
  */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  rounded?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// TODO: Add loading status with spinner

export function Button({
  children,
  icon,
  onClick,
  disabled = false,
  ariaBusy = false,
  variant = 'primary',
  rounded = false,
  type = 'button',
}: ButtonProps) {
  // const paddingStart = icon ? 'var(--bn-spacing-8)' : 'var(--bn-spacing-16)';

  const onlyIcon = icon && !children;

  const classNames = clsx(styles.button, {
    [styles.primary]: variant === 'primary',
    [styles.secondary]: variant === 'secondary',
    [styles.tertiary]: variant === 'tertiary',
    [styles.ghost]: variant === 'ghost',
    [styles.rounded]: rounded,
    [styles.onlyIcon]: onlyIcon,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={ariaBusy}
      className={classNames}
      style={
        {
          // '--padding-start': paddingStart,
        } as React.CSSProperties
      }
    >
      {icon && (
        <Icon
          type={icon}
          fillColor="transparent"
          strokeColor="var(--bn-base-color-gray--10)"
          width={22}
          height={22}
        />
      )}
      {children}
    </button>
  );
}
