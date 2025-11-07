import { ArrowDown } from './icons/ArrowDown';

export type IconTypes = 'arrow-down';

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
};

export function Icon({ type = 'arrow-down' }: IconProps) {
  const IconComponent = iconComponents[type];
  return <IconComponent />;
}
