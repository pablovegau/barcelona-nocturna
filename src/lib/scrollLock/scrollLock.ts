type HeaderStyles = {
  position: 'fixed' | 'sticky' | '';
  width: '100%' | '';
  top: '0' | '';
};

type BodyStyles = {
  position: 'relative' | '' | string;
  overflow: 'hidden' | '';
  paddingRight: string;
  paddingTop: string;
};

interface IScrollLock {
  lock(): void;
  unlock(): void;
  toggle(): void;
  isScrollLocked(): boolean;
}

class ScrollLock implements IScrollLock {
  private scrollPosition: number;
  private scrollbarWidth: number;
  private isLocked: boolean;

  constructor() {
    this.scrollPosition = 0;
    this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    this.isLocked = false;
  }

  private getHeader(): HTMLElement | null {
    return document.querySelector('.header');
  }

  private setHeaderStyles(header: HTMLElement, styles: Partial<HeaderStyles>): void {
    Object.entries(styles).forEach(([property, value]) => {
      header.style[property as keyof HeaderStyles] = value;
    });
  }

  private setBodyStyles(styles: Partial<BodyStyles>): void {
    Object.entries(styles).forEach(([property, value]) => {
      document.body.style[property as keyof BodyStyles] = value;
    });
  }

  public lock(): void {
    if (this.isLocked) return;
   
    // this.scrollPosition = window.scrollY;

    // const header = this.getHeader();
    // if (header) {
      // Guardamos la altura actual del header antes de modificarlo
    //   const headerHeight = header.offsetHeight;
     
      // Fijamos el header en la parte superior
    //   this.setHeaderStyles(header, {
    //     position: 'fixed',
    //     width: '100%',
    //     top: '0'
    //   });

      // Añadimos padding al body para compensar el espacio del header
    //   this.setBodyStyles({
    //     paddingTop: `${headerHeight}px`
    //   });
    // }

    // 3. Bloqueamos el scroll del body
    this.setBodyStyles({
      position: 'relative',
      overflow: 'hidden',
      // Compensamos el ancho de la scrollbar para evitar saltos
      paddingRight: `${this.scrollbarWidth}px`
    });
   
    // 4. Actualizamos el estado
    this.isLocked = true;
  }

  // Método público para desbloquear el scroll
  public unlock(): void {
    // Si no está bloqueado, no hacemos nada
    if (!this.isLocked) return;

    // 1. Manejamos el header si existe
    // const header = this.getHeader();
    // if (header) {
      // Devolvemos el header a su estado original
    //   this.setHeaderStyles(header, {
    //     position: 'sticky',
    //     width: '',
    //     top: ''
    //   });

      // Eliminamos el padding compensatorio
    //   this.setBodyStyles({
    //     paddingTop: ''
    //   });
    // }

    // 2. Desbloqueamos el scroll del body
    this.setBodyStyles({
      position: '',
      overflow: '',
      paddingRight: ''
    });
   
    // 3. Actualizamos el estado
    this.isLocked = false;
  }

  // Método público para alternar entre bloqueado/desbloqueado
  public toggle(): void {
    this.isLocked ? this.unlock() : this.lock();
  }

  // Método público para consultar el estado actual
  public isScrollLocked(): boolean {
    return this.isLocked;
  }
}

// Creamos y exportamos una única instancia (Singleton)
export const scrollLock = new ScrollLock();

// Exportamos los tipos por si son necesarios en otros archivos
export type { IScrollLock, HeaderStyles, BodyStyles };