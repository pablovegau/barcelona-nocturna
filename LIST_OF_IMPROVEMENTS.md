# Lista de Mejoras Propuestas para Barcelona Nocturna

## 1. Optimizaciones de Rendimiento

- [ ] Considerar implementar un Service Worker para funcionalidad offline ⭐⭐⭐⭐


## 2. SEO y Accesibilidad
- [ ] **[CRÍTICO]** Añadir etiquetas Open Graph y Twitter Card en `src/layouts/BaseHead.astro`. ⭐⭐

- [ ] Implementar datos estructurados (JSON-LD) para mejor SEO ⭐⭐⭐
- [ ] Añadir `aria-label` a componentes interactivos (`ChatInput`, `ThemeToggle`). ⭐
- [ ] Mejorar navegación por teclado ⭐⭐⭐
- [ ] Añadir skip links para mejor accesibilidad ⭐⭐
- [ ] Añadir sitemap.xml ⭐⭐

## 3. Organización del Código
- [ ] **[CRÍTICO]** Centralizar constantes (IDs, textos UI) en `src/constants/index.ts`. ⭐

- [ ] Estandarizar esquemas de colecciones en `src/content.config.ts` (unificar `name` vs `name_es`). ⭐⭐
- [ ] Resolver TODOs en esquemas de contenido (ej. `role` como array en `characters`). ⭐⭐
- [ ] Crear un sistema de diseño propio con documentación de componentes ⭐⭐⭐⭐⭐
- [ ] Mover variables CSS a un archivo de tema dedicado ⭐⭐
- [ ] Añadir interfaces TypeScript para todos los props de componentes ⭐⭐

## 4. Funcionalidades
- [ ] Añadir funcionalidad de búsqueda para personajes y posts ⭐⭐⭐⭐
- [ ] Implementar filtrado por múltiples criterios (clan, facción, estado) ⭐⭐⭐
- [ ] Añadir una página 404 apropiada con sugerencias ⭐
- [ ] Añadir estados de carga para contenido dinámico ⭐⭐
- [ ] Considerar añadir soporte para i18n (contenido en español/inglés) ⭐⭐⭐⭐⭐

## 5. Experiencia de Desarrollo
- [ ] Añadir documentación apropiada para la configuración del proyecto y contribución ⭐⭐
- [ ] Añadir ESLint junto con Biome para un linting más comprensivo ⭐⭐
- [ ] Añadir Storybook o similar para desarrollo de componentes ⭐⭐⭐⭐
- [ ] Añadir Git hooks apropiados (husky) para checks pre-commit ⭐⭐
- [ ] Añadir error boundaries y manejo de errores apropiado ⭐⭐⭐

## 6. Gestión de Contenido
- [ ] Añadir un CMS apropiado para gestión de contenido ⭐⭐⭐⭐⭐
- [ ] Añadir validación para relaciones entre personajes ⭐⭐⭐
- [ ] Añadir pipeline de optimización de imágenes ⭐⭐⭐
- [ ] Añadir sistema de gestión de assets apropiado ⭐⭐⭐

## 7. Gestión de Estado
- [ ] Considerar añadir una solución de gestión de estado para interacciones complejas ⭐⭐⭐⭐
- [ ] Añadir caché de datos apropiado del lado del cliente ⭐⭐⭐⭐
- [ ] Implementar manejo y validación de formularios apropiado ⭐⭐⭐

## 8. Build y Despliegue

- [ ] Añadir pasos de optimización de build apropiados ⭐⭐⭐
- [ ] Añadir pipeline de despliegue con entorno de staging ⭐⭐⭐
- [ ] Añadir monitorización y analytics apropiados ⭐⭐

## 9. Seguridad
- [ ] **[CRÍTICO]** Añadir validación Zod en API routes (`src/pages/api/ai/genesis.ts`). ⭐⭐
- [ ] Implementar manejo de errores robusto en llamadas a IA (try/catch). ⭐⭐
- [ ] Añadir headers de seguridad apropiados ⭐⭐
- [ ] Añadir CSP (Content Security Policy) apropiado ⭐⭐⭐⭐
- [ ] Añadir configuración CORS apropiada ⭐⭐
- [ ] Añadir rate limiting para rutas de API ⭐⭐⭐

## 10. Experiencia de Usuario
- [ ] **[MEJORA]** Implementar auto-resize en `ChatInput`. ⭐⭐
- [ ] **[MEJORA]** Deshabilitar input de chat mientras se genera respuesta. ⭐
- [ ] Sincronizar `ThemeToggle` con cambios en preferencias del sistema (listener). ⭐⭐
- [ ] Añadir estados de carga apropiados ⭐⭐
- [ ] Añadir estados de error apropiados ⭐⭐
- [ ] Añadir estados de éxito apropiados ⭐⭐
- [ ] Añadir animaciones y transiciones apropiadas ⭐⭐⭐
- [ ] Mejorar navegación móvil ⭐⭐⭐

## 11. Testing
- [ ] Configurar Vitest para testing unitario (especialmente `src/domain`). ⭐⭐
- [ ] Añadir Cypress/Playwright para E2E testing ⭐⭐⭐
- [ ] Implementar Testing Library para tests de componentes ⭐⭐⭐
- [ ] Añadir tests unitarios para:
  - [ ] Utilidades y helpers ⭐⭐
  - [ ] Hooks personalizados ⭐⭐
  - [ ] Funciones de transformación de datos ⭐⭐
  - [ ] Validadores ⭐⭐
