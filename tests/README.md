# Testing Visual 🎯

Este proyecto usa **Playwright** para testing visual/regression tests.

## 🚀 Comandos disponibles

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar con interfaz visual
npm run test:ui

# Ejecutar solo tests visuales
npm run test:visual

# Ejecutar con navegador visible (debug)
npm run test:headed

# Ver reporte de resultados
npm run test:report

# Debug interactivo
npm run test:debug
```

## 📂 Estructura

```
tests/
├── visual/
│   └── homepage.spec.js          # Tests de página inicial
├── e2e/                          # Future: tests funcionales
└── README.md                     # Este archivo
```

## 🎨 Tests visuales incluidos

### Homepage (`homepage.spec.js`)

- ✅ **Desktop view** (1280x720)
- ✅ **Tablet view** (768x1024) 
- ✅ **Mobile view** (375x667)
- ✅ **Dark theme** (desktop + mobile)
- ✅ **Mobile menu abierto**
- ✅ **Header en estado scroll**
- ✅ **Componentes individuales**

## 🔧 Primer uso

### 1. Generar screenshots baseline
```bash
npm run test:visual
```
La primera vez generará los screenshots "correctos" (baseline).

### 2. Verificar cambios
Después de cualquier cambio CSS, ejecuta:
```bash
npm run test:visual
```

### 3. Revisar diferencias
Si hay cambios visuales:
```bash
npm run test:report
```
Te abrirá un reporte HTML con antes/después.

## 📸 Screenshots

Los screenshots se guardan en:
```
tests/visual/homepage.spec.js-snapshots/
├── homepage-desktop-Desktop-Chrome.png
├── homepage-mobile-Desktop-Chrome.png
├── homepage-desktop-dark-Desktop-Chrome.png
└── ...
```

## ⚙️ Configuración

### Threshold de diferencia
En `playwright.config.js`:
```javascript
expect: {
  threshold: 0.3, // 30% diferencia permitida
}
```

### Navegadores incluidos
- ✅ **Desktop Chrome**
- ✅ **Desktop Firefox** 
- ✅ **Desktop Safari**
- ✅ **Mobile Chrome** (Pixel 5)
- ✅ **Mobile Safari** (iPhone 12)
- ✅ **Tablet** (iPad Pro)

## 🚨 Workflow recomendado

### Antes de refactoring CSS:
```bash
# 1. Asegurar que baseline es correcto
npm run test:visual

# 2. Hacer cambios CSS
# 3. Verificar cambios
npm run test:visual

# 4. Si hay diferencias, revisar
npm run test:report

# 5. Si los cambios son correctos, actualizar baseline
npx playwright test --update-snapshots
```

### Al cambiar componentes:
1. **Test pasa** ✅ → No hay cambios visuales
2. **Test falla** ❌ → Revisar si el cambio es intencional
   - **Correcto**: Actualizar baseline
   - **Incorrecto**: Arreglar CSS

## 🎯 Casos de uso

### Detectar regresiones
```bash
# Alguien toca CSS por error
npm run test:visual
# ❌ Falla → Detecta el problema
```

### Refactoring seguro
```bash
# Migrar a CSS modules
npm run test:visual  # Baseline
# Hacer refactoring...
npm run test:visual  # Verificar que nada cambió
```

### Cross-browser testing
Los tests se ejecutan en múltiples navegadores automáticamente, detectando inconsistencias.

## 💡 Tips

- **Fuentes**: Los tests esperan 1s para que las fuentes carguen
- **Animaciones**: Están deshabilitadas para screenshots consistentes  
- **Scrolling**: Se testea el estado con scroll del header
- **Themes**: Se prueban tanto light como dark theme
- **Mobile menu**: Se testea la funcionalidad del menú móvil

## 🐛 Troubleshooting

### Tests fallan por fuentes
```javascript
// En el test, aumentar timeout
await page.waitForTimeout(2000);
```

### Diferencias mínimas
```javascript
// Aumentar threshold en playwright.config.js
threshold: 0.5, // 50%
```

### Navegador no encontrado
```bash
npx playwright install
``` 