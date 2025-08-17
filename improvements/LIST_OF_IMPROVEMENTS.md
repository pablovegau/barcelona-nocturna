# Lista de Mejoras Propuestas para Barcelona Nocturna

> **📁 Nueva Ubicación:** Este archivo ha sido reorganizado dentro de `/improvements/` para mejor gestión del proyecto.

## 1. Optimizaciones de Rendimiento
- [x] Implementar carga perezosa (lazy loading) para imágenes de personajes
- [ ] Añadir directivas de precarga para assets críticos (fuentes, CSS principal)
- [ ] Considerar implementar un Service Worker para funcionalidad offline
- [ ] Añadir resource hints (preconnect, prefetch) para recursos externos

## 2. SEO y Accesibilidad
- [ ] Añadir meta descripciones para todas las páginas
- [ ] Implementar datos estructurados (JSON-LD) para mejor SEO
- [ ] Añadir aria-labels y roles donde falten
- [ ] Mejorar navegación por teclado
- [ ] Añadir skip links para mejor accesibilidad
- [ ] Añadir sitemap.xml

## 3. Organización del Código
- [ ] Crear un sistema de diseño propio con documentación de componentes
- [ ] Mover variables CSS a un archivo de tema dedicado
- [ ] Crear una estructura apropiada para archivos de constantes
- [ ] Añadir interfaces TypeScript para todos los props de componentes
- [ ] Considerar usar CSS Modules de manera consistente

## 4. Funcionalidades
- [ ] Añadir funcionalidad de búsqueda para personajes y posts
- [ ] Implementar filtrado por múltiples criterios (clan, facción, estado)
- [ ] Añadir una página 404 apropiada con sugerencias
- [ ] Añadir estados de carga para contenido dinámico
- [ ] Considerar añadir soporte para i18n (contenido en español/inglés)

## 5. Experiencia de Desarrollo
- [ ] Añadir documentación apropiada para la configuración del proyecto y contribución
- [ ] ~~Añadir ESLint junto con Biome para un linting más comprensivo~~ → **Mantener solo Biome** (ver [github-actions-ci-cd.md](./github-actions-ci-cd.md))
- [ ] Añadir Storybook o similar para desarrollo de componentes
- [ ] Añadir Git hooks apropiados (husky) para checks pre-commit
- [ ] Añadir error boundaries y manejo de errores apropiado

## 6. Gestión de Contenido
- [ ] Añadir un CMS apropiado para gestión de contenido
- [ ] Añadir validación para relaciones entre personajes
- [ ] Añadir pipeline de optimización de imágenes
- [ ] Añadir sistema de gestión de assets apropiado

## 7. Gestión de Estado
- [ ] Considerar añadir una solución de gestión de estado para interacciones complejas
- [ ] Añadir caché de datos apropiado del lado del cliente
- [ ] Implementar manejo y validación de formularios apropiado

## 8. Build y Despliegue
- [ ] Añadir configuración de entorno apropiada
- [ ] Añadir pasos de optimización de build apropiados
- [ ] Añadir pipeline de despliegue con entorno de staging
- [ ] Añadir monitorización y analytics apropiados

## 9. Seguridad
- [ ] Añadir headers de seguridad apropiados
- [ ] Añadir CSP (Content Security Policy) apropiado
- [ ] Añadir configuración CORS apropiada
- [ ] Añadir rate limiting para rutas de API

## 10. Experiencia de Usuario
- [ ] Añadir estados de carga apropiados
- [ ] Añadir estados de error apropiados
- [ ] Añadir estados de éxito apropiados
- [ ] Añadir animaciones y transiciones apropiadas
- [ ] Mejorar navegación móvil

## 11. Testing
- [ ] Configurar Jest/Vitest para testing unitario → **Ver [testing-strategy.md](./testing-strategy.md)**
- [x] Añadir Cypress/Playwright para E2E testing → **Playwright ya configurado**
- [ ] Implementar Testing Library para tests de componentes
- [ ] Añadir tests unitarios para:
  - [ ] Utilidades y helpers
  - [ ] Hooks personalizados
  - [ ] Funciones de transformación de datos
  - [ ] Validadores
- [ ] Añadir tests de integración para:
  - [ ] Flujos de navegación
  - [ ] Interacciones de componentes
  - [ ] Manejo de estado
  - [ ] Carga y renderizado de datos
- [ ] Añadir tests E2E para:
  - [ ] Flujos críticos de usuario
  - [ ] Navegación principal
  - [ ] Búsqueda y filtrado
  - [ ] Responsive design
- [ ] Implementar tests de accesibilidad:
  - [ ] Tests automáticos con axe-core
  - [ ] Tests de navegación por teclado
  - [ ] Tests de lectores de pantalla
- [ ] Añadir tests de rendimiento:
  - [ ] Lighthouse CI
  - [ ] Tests de carga de página
  - [ ] Tests de tiempo de interacción
  - [ ] Tests de tamaño de bundle
- [ ] Configurar cobertura de código:
  - [ ] Establecer umbrales mínimos de cobertura
  - [ ] Integrar reportes en el pipeline de CI
- [ ] Añadir tests de snapshot para:
  - [ ] Componentes UI críticos
  - [ ] Páginas principales
- [x] Implementar testing visual → **Visual regression tests ya configurados**
  - [ ] Percy o similar para testing visual automatizado
  - [x] Tests de regresión visual
- [ ] Añadir tests de seguridad:
  - [ ] Análisis estático de seguridad (SAST)
  - [ ] Escaneo de dependencias
  - [ ] Tests de penetración automatizados

## 12. CI/CD y DevOps → **Ver [github-actions-ci-cd.md](./github-actions-ci-cd.md)**
- [x] Visual Regression Testing con Playwright
- [x] Workflow manual para actualizar baselines visuales
- [x] Configuración básica de Biome para linting
- [ ] **CI Pipeline Principal** - Linting, type checking, build automático
- [ ] **Security Scanning** - npm audit, CodeQL, dependency scanning
- [ ] **Performance Monitoring** - Lighthouse CI, bundle analysis
- [ ] **Dependabot** - Actualizaciones automáticas de dependencias

## 13. Configuración y Desarrollo
- [x] **Simplificar configuración de Astro eliminando adapter**: ✅ **COMPLETADO** - Migrado de `@astrojs/netlify` a `@astrojs/node` para unificar configuración. Eliminado `astro.config.test.mjs` y ahora usamos una sola configuración con `output: 'server'` que soporta tanto páginas estáticas como SSR. Esto simplifica el desarrollo, testing y deployment manteniendo la funcionalidad de filtros server-side.

## 📚 Documentación Relacionada

- **[Roadmap de Implementación](./implementation-roadmap.md)** - Plan temporal detallado
- **[GitHub Actions y CI/CD](./github-actions-ci-cd.md)** - Pipeline completo de CI/CD
- **[Estrategia de Testing](./testing-strategy.md)** - Plan integral de testing
- **[README Principal](./README.md)** - Visión general de todas las mejoras

## Notas sobre Testing
- Priorizar tests para funcionalidades críticas
- Mantener un balance entre diferentes tipos de tests (pirámide de testing)
- Integrar tests en el pipeline de CI/CD
- Documentar patrones y mejores prácticas de testing
- Establecer procesos para mantenimiento y actualización de tests

## Notas Adicionales
- Esta lista es un documento vivo que debe ser actualizado según evolucionen las necesidades del proyecto
- Las tareas están marcadas con checkboxes para facilitar el seguimiento
- Se recomienda priorizar las tareas según el impacto en el usuario final y la facilidad de implementación
- **Ver [implementation-roadmap.md](./implementation-roadmap.md)** para la planificación temporal detallada

---

**Última actualización:** Enero 2025  
**Organizada en:** `/improvements/` para mejor gestión 