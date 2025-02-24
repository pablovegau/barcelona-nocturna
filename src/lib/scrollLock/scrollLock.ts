// Definimos los tipos de estilos que vamos a manipular para el header
// Esto nos ayuda a tener un autocompletado preciso y evitar errores
type HeaderStyles = {
  position: 'fixed' | 'sticky' | ''; // Solo permitimos estos valores
  width: '100%' | '';
  top: '0' | '';
};

// Los estilos que vamos a manipular en el body
type BodyStyles = {
  position: 'relative' | '' | string;
  overflow: 'hidden' | '';
  paddingRight: string;
  paddingTop: string;
};

// Definimos la interfaz que describe qué métodos públicos tendrá nuestra clase
interface IScrollLock {
  lock(): void;     // Bloquea el scroll
  unlock(): void;   // Desbloquea el scroll
  toggle(): void;   // Alterna entre bloqueado/desbloqueado
  isScrollLocked(): boolean; // Nos dice si está bloqueado
}

class ScrollLock implements IScrollLock {
  // Variables privadas que solo se pueden acceder dentro de la clase
  private scrollPosition: number;     // Guarda la posición del scroll
  private scrollbarWidth: number;     // Ancho de la scrollbar
  private isLocked: boolean;          // Estado actual del scroll

  constructor() {
    // Inicializamos las variables
    this.scrollPosition = 0;
    // Calculamos el ancho de la scrollbar (diferencia entre el ancho total y el ancho sin scrollbar)
    this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    this.isLocked = false;
  }

  // Método helper para obtener el header
  private getHeader(): HTMLElement | null {
    return document.querySelector('.header');
  }

  // Método helper para actualizar los estilos del header
  // Usa Partial<HeaderStyles> para permitir actualizar solo algunos estilos
  private setHeaderStyles(header: HTMLElement, styles: Partial<HeaderStyles>): void {
    Object.entries(styles).forEach(([property, value]) => {
      header.style[property as keyof HeaderStyles] = value;
    });
  }

  // Método helper para actualizar los estilos del body
  private setBodyStyles(styles: Partial<BodyStyles>): void {
    Object.entries(styles).forEach(([property, value]) => {
      document.body.style[property as keyof BodyStyles] = value;
    });
  }

  // Método público para bloquear el scroll
  public lock(): void {
    // Si ya está bloqueado, no hacemos nada
    if (this.isLocked) return;
   
    // 1. Guardamos la posición actual del scroll
    this.scrollPosition = window.scrollY;

    // 2. Manejamos el header si existe
    const header = this.getHeader();
    if (header) {
      // Guardamos la altura actual del header antes de modificarlo
      const headerHeight = header.offsetHeight;
     
      // Fijamos el header en la parte superior
      this.setHeaderStyles(header, {
        position: 'fixed',
        width: '100%',
        top: '0'
      });

      // Añadimos padding al body para compensar el espacio del header
      this.setBodyStyles({
        paddingTop: `${headerHeight}px`
      });
    }

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
    const header = this.getHeader();
    if (header) {
      // Devolvemos el header a su estado original
      this.setHeaderStyles(header, {
        position: 'sticky',
        width: '',
        top: ''
      });

      // Eliminamos el padding compensatorio
      this.setBodyStyles({
        paddingTop: ''
      });
    }

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