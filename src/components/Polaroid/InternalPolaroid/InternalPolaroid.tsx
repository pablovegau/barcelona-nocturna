import clsx from 'clsx';
// import type React from 'react';
import type { ReactNode } from 'react';

import styles from './InternalPolaroid.module.css';
// import { useCardShift } from './useCardShift';

interface InternalPolaroidProps {
  children: ReactNode;
  name: string;
  backgroundURL?: string;
  size?: 'sm' | 'md' | 'lg';
}

const InternalPolaroid = ({
  children,
  name,
  backgroundURL,
  size = 'md',
}: InternalPolaroidProps) => {
  // const { handleOnMouseEnter, handleOnMouseLeave, handleOnMouseMove } =
  //   useCardShift();

  const cardClasses = clsx(styles.polaroid, { [styles[size]]: size });

  return (
    <div
      className={cardClasses}
      style={{ '--background': `url(${backgroundURL})` } as React.CSSProperties}
    >
      <figure
      // onMouseMove={handleOnMouseMove}
      // onMouseEnter={handleOnMouseEnter}
      // onMouseLeave={handleOnMouseLeave}
      >
        <div className={styles.polaroid__image}>{children}</div>
        <figcaption>{name}</figcaption>
      </figure>
    </div>
  );
};

export default InternalPolaroid;
