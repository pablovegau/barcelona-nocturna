import { ArrowDown } from './icons/ArrowDown';
import { Send } from './icons/Send';

export type IconTypes = 'arrow-down' | 'send';

export type IconProps = {
  ariaHidden?: boolean;
  fillColor?: string;
  height?: number;
  strokeColor?: string;
  type?: IconTypes;
  width?: number;
};

const iconComponents = {
  'arrow-down': ArrowDown,
  send: Send,
};

export function Icon({ type = 'arrow-down', ...props }: IconProps) {
  const IconComponent = iconComponents[type];
  return <IconComponent {...props} />;
}
