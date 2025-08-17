# 🧪 Estrategia de Testing Integral

## 📋 Resumen Ejecutivo

Plan completo para implementar una estrategia de testing robusta en Barcelona Nocturna, cubriendo testing unitario, de integración, E2E y visual regression.

## 🎯 Objetivos

- **Prevenir regresiones** mediante testing automatizado
- **Acelerar el desarrollo** con feedback rápido
- **Aumentar la confianza** en los deploys
- **Documentar el comportamiento** esperado del código

## 🏗️ Pirámide de Testing

```
        /\
       /  \
      / E2E \
     /______\
    /        \
   /Integration\
  /__________\
 /            \
/  Unit Tests  \
/______________\
```

## 🔧 Configuración Técnica

### 1. Testing Unitario con Vitest

#### Instalación
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

#### Configuración: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '.astro/',
        'playwright.config.js'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
      '@comp/': new URL('./src/components/', import.meta.url).pathname,
      '@domain/': new URL('./src/domain/', import.meta.url).pathname,
    }
  }
});
```

#### Setup: `tests/setup.ts`
```typescript
import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

// Mock Astro globals
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
}));

beforeEach(() => {
  // Reset all mocks before each test
  vi.clearAllMocks();
});
```

### 2. Testing de Componentes React

#### Ejemplo: `tests/components/FilterItem.test.tsx`
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterItem from '@comp/FilterItem/FilterItem.astro';

describe('FilterItem', () => {
  it('should render filter item with correct text', () => {
    const mockOnClick = vi.fn();
    
    render(
      <FilterItem
        text="Toreador"
        isActive={false}
        onClick={mockOnClick}
      />
    );
    
    expect(screen.getByText('Toreador')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn();
    
    render(
      <FilterItem
        text="Toreador"
        isActive={false}
        onClick={mockOnClick}
      />
    );
    
    fireEvent.click(screen.getByText('Toreador'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have active class when isActive is true', () => {
    render(
      <FilterItem
        text="Toreador"
        isActive={true}
        onClick={vi.fn()}
      />
    );
    
    expect(screen.getByText('Toreador')).toHaveClass('active');
  });
});
```

### 3. Testing de Funciones Utilitarias

#### Ejemplo: `tests/domain/characters.test.ts`
```typescript
import { describe, it, expect } from 'vitest';
import { filterCharactersByClans, getCharactersByFaction } from '@domain/characters';

describe('Characters Domain Logic', () => {
  const mockCharacters = [
    {
      id: 'test-1',
      name: 'Test Character 1',
      clan: 'toreador',
      faction: 'camarilla',
      entityType: 'vampire'
    },
    {
      id: 'test-2',
      name: 'Test Character 2',
      clan: 'brujah',
      faction: 'anarch',
      entityType: 'vampire'
    }
  ];

  describe('filterCharactersByClans', () => {
    it('should return all characters when no clans specified', () => {
      const result = filterCharactersByClans(mockCharacters, []);
      expect(result).toEqual(mockCharacters);
    });

    it('should filter characters by specified clans', () => {
      const result = filterCharactersByClans(mockCharacters, ['toreador']);
      expect(result).toHaveLength(1);
      expect(result[0].clan).toBe('toreador');
    });

    it('should handle multiple clan filters', () => {
      const result = filterCharactersByClans(mockCharacters, ['toreador', 'brujah']);
      expect(result).toHaveLength(2);
    });
  });

  describe('getCharactersByFaction', () => {
    it('should return characters from specified faction', () => {
      const result = getCharactersByFaction(mockCharacters, 'camarilla');
      expect(result).toHaveLength(1);
      expect(result[0].faction).toBe('camarilla');
    });
  });
});
```

### 4. Testing de Integración

#### Ejemplo: `tests/integration/filters.test.ts`
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FiltersContainer from '@containers/Filters/Filters.astro';

describe('Filters Integration', () => {
  beforeEach(() => {
    // Setup DOM or mock data as needed
  });

  it('should filter characters when clan filter is applied', async () => {
    render(<FiltersContainer characters={mockCharacters} />);
    
    // Click on Toreador filter
    fireEvent.click(screen.getByText('Toreador'));
    
    // Wait for filtering to complete
    await waitFor(() => {
      expect(screen.queryByText('Brujah Character')).not.toBeInTheDocument();
      expect(screen.getByText('Toreador Character')).toBeInTheDocument();
    });
  });

  it('should handle multiple filters correctly', async () => {
    render(<FiltersContainer characters={mockCharacters} />);
    
    // Apply multiple filters
    fireEvent.click(screen.getByText('Toreador'));
    fireEvent.click(screen.getByText('Camarilla'));
    
    await waitFor(() => {
      // Should show only characters that match BOTH filters
      const visibleCharacters = screen.getAllByTestId('character-card');
      expect(visibleCharacters).toHaveLength(1);
    });
  });
});
```

### 5. Testing E2E con Playwright (Extensión)

#### Configuración adicional: `tests/e2e/`
```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('should navigate through main sections', async ({ page }) => {
    await page.goto('/');
    
    // Test homepage
    await expect(page.getByRole('heading', { name: 'Barcelona Nocturna' })).toBeVisible();
    
    // Navigate to characters
    await page.click('text=Personajes');
    await expect(page).toHaveURL('/characters');
    await expect(page.getByText('Lista de Personajes')).toBeVisible();
    
    // Test character detail
    await page.click('[data-testid="character-card"]:first-child');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should filter characters correctly', async ({ page }) => {
    await page.goto('/characters');
    
    // Count initial characters
    const initialCount = await page.locator('[data-testid="character-card"]').count();
    
    // Apply clan filter
    await page.click('text=Toreador');
    
    // Check filtered results
    const filteredCount = await page.locator('[data-testid="character-card"]').count();
    expect(filteredCount).toBeLessThan(initialCount);
    
    // Verify URL params
    await expect(page).toHaveURL(/.*clans=toreador.*/);
  });
});
```

### 6. Testing de Accesibilidad

#### Con @axe-core/playwright
```typescript
// tests/accessibility/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should be accessible', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('characters page should be accessible', async ({ page }) => {
    await page.goto('/characters');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('.background-pattern') // Exclude decorative elements
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard navigation should work', async ({ page }) => {
    await page.goto('/characters');
    
    // Tab through filters
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Check that filter was applied
    await expect(page).toHaveURL(/.*clans=.*/);
  });
});
```

## 📊 Coverage y Reporting

### Coverage Configuration
```typescript
// vitest.config.ts - Coverage section
coverage: {
  reporter: ['text', 'json', 'html', 'lcov'],
  exclude: [
    'node_modules/',
    'tests/',
    'dist/',
    '.astro/',
    'playwright.config.js',
    '**/*.d.ts',
    '**/*.config.*',
    '**/types.ts'
  ],
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    // Per-file thresholds
    'src/domain/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
```

## 📅 Plan de Implementación

### Fase 1: Setup Básico (1 semana)
- [ ] Configurar Vitest y Testing Library
- [ ] Crear tests para funciones utilitarias
- [ ] Configurar coverage reporting

### Fase 2: Component Testing (2 semanas)
- [ ] Tests para componentes principales
- [ ] Tests de integración para filters
- [ ] Setup de mocking para Astro components

### Fase 3: E2E y Accesibilidad (1 semana)
- [ ] Extender tests E2E existentes
- [ ] Añadir tests de accesibilidad
- [ ] Configurar tests de performance

### Fase 4: CI Integration (1 semana)
- [ ] Integrar en GitHub Actions
- [ ] Configurar reportes automáticos
- [ ] Setup de quality gates

## 📜 Scripts Package.json

```json
{
  "scripts": {
    // Testing
    "test": "vitest",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest --watch",
    "test:unit:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test tests/e2e",
    "test:a11y": "playwright test tests/accessibility",
    "test:all": "npm run test:unit && npm run test:visual && npm run test:e2e",
    
    // CI
    "ci:test": "npm run test:unit && npm run test:e2e"
  }
}
```

## ✅ Criterios de Aceptación

### Coverage Mínimo
- **Funciones utilitarias**: 90%
- **Componentes**: 80%
- **Integration tests**: 70%
- **E2E critical paths**: 100%

### Quality Gates
- [ ] Todos los tests deben pasar
- [ ] Coverage debe cumplir umbrales
- [ ] No violaciones de accesibilidad
- [ ] Performance dentro de límites

## 🎯 Beneficios Esperados

- **Confianza** en los cambios del código
- **Detección temprana** de bugs
- **Documentación viva** del comportamiento
- **Refactoring seguro** 
- **Mejor calidad** del código 