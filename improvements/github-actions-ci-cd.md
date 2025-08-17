# 🚀 GitHub Actions y CI/CD Pipeline

## 📋 Resumen Ejecutivo

Implementación completa de un pipeline de CI/CD robusto para Barcelona Nocturna, incluyendo quality checks, testing automatizado, security scanning y deployment.

## 🎯 Objetivos

- **Automatizar** todos los checks de calidad del código
- **Prevenir** errores antes de que lleguen a producción
- **Acelerar** el proceso de desarrollo y deployment
- **Mantener** alta calidad y seguridad del código

## 📦 Workflows a Implementar

### 1. 🔍 CI Pipeline Principal
**Archivo:** `.github/workflows/ci.yml`

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'

jobs:
  # Job 1: Code Quality
  code-quality:
    name: 🔍 Code Quality
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run Biome (Lint + Format)
      run: npm run biome
    
    - name: TypeScript Check
      run: npx astro check
    
    - name: Check code formatting
      run: npm run biome -- --formatter-enabled=true --linter-enabled=false

  # Job 2: Build Test
  build:
    name: 🏗️ Build
    runs-on: ubuntu-latest
    needs: code-quality
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - run: npm ci
    - name: Build Project
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: dist-${{ github.sha }}
        path: dist/
        retention-days: 7
```

### 2. 🔒 Security Pipeline
**Archivo:** `.github/workflows/security.yml`

```yaml
name: Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1' # Lunes a las 2 AM

permissions:
  contents: read
  security-events: write

jobs:
  dependency-check:
    name: 🔍 Dependency Audit
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    - name: Run dependency audit
      run: npm audit --audit-level=high
    
    - name: Check for known vulnerabilities
      run: npm audit --json > audit-results.json
    
    - name: Upload audit results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: security-audit
        path: audit-results.json

  codeql-analysis:
    name: 🔎 CodeQL Analysis
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    
    - name: Initialize CodeQL
      uses: github/codeql-action/init@v3
      with:
        languages: javascript
    
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3
```

### 3. ⚡ Performance Pipeline
**Archivo:** `.github/workflows/performance.yml`

```yaml
name: Performance Tests

on:
  pull_request:
    branches: [ main ]

jobs:
  lighthouse:
    name: 🚦 Lighthouse CI
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    - run: npm run build
    
    - name: Lighthouse CI
      uses: treosh/lighthouse-ci-action@v12
      with:
        configPath: './lighthouserc.js'
        uploadArtifacts: true
        temporaryPublicStorage: true

  bundle-analysis:
    name: 📦 Bundle Analysis
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    - run: npm run build
    
    - name: Analyze bundle size
      uses: @next/bundle-analyzer@latest
      with:
        build-script: npm run build
```

### 4. 🤖 Dependabot Configuration
**Archivo:** `.github/dependabot.yml`

```yaml
version: 2
updates:
  # Package dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "tu-username"
    assignees:
      - "tu-username"
    commit-message:
      prefix: "deps"
      include: "scope"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
```

## 📜 Scripts Adicionales para package.json

```json
{
  "scripts": {
    // Existing scripts...
    
    // Quality assurance
    "lint": "biome check .",
    "lint:fix": "biome check --apply .",
    "format": "biome format --write .",
    "format:check": "biome format .",
    "type-check": "astro check",
    
    // Testing (para cuando se implementen)
    "test:unit": "vitest",
    "test:unit:watch": "vitest --watch",
    "test:unit:coverage": "vitest --coverage",
    "test:e2e": "playwright test tests/e2e",
    
    // CI helpers
    "ci:quality": "npm run lint && npm run type-check",
    "ci:test": "npm run test:unit && npm run test:visual",
    "ci:build": "npm run ci:quality && npm run build"
  }
}
```

## 🔧 Configuraciones Adicionales

### Lighthouse CI Configuration
**Archivo:** `lighthouserc.js`

```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4321'],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Configuración Mejorada de Biome
**Archivo actualizado:** `biome.json`

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": ["node_modules", "dist", ".astro", "playwright-report", "test-results"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "a11y": {
        "recommended": true
      },
      "complexity": {
        "recommended": true
      },
      "performance": {
        "recommended": true
      },
      "security": {
        "recommended": true
      },
      "style": {
        "recommended": true
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "indentStyle": "space",
      "indentWidth": 2,
      "semicolons": "always"
    }
  }
}
```

## 📅 Plan de Implementación

### Fase 1: Básicos (1 semana)
1. [ ] Crear CI pipeline principal
2. [ ] Configurar Dependabot
3. [ ] Añadir scripts de calidad al package.json

### Fase 2: Security & Performance (1 semana)
1. [ ] Implementar security scanning
2. [ ] Configurar Lighthouse CI
3. [ ] Añadir bundle analysis

### Fase 3: Avanzado (2 semanas)
1. [ ] Configurar deployment automático
2. [ ] Añadir monitoring y alertas
3. [ ] Implementar feature flags

## ✅ Criterios de Aceptación

- [ ] Todos los PRs deben pasar los checks de calidad
- [ ] Build debe ser exitoso en todos los entornos
- [ ] Security scan debe estar limpio
- [ ] Performance score debe ser > 80 en Lighthouse
- [ ] Coverage de tests debe ser > 80% (cuando se implementen)

## 🚀 Beneficios Esperados

- **Reducción de bugs** en producción en 90%
- **Aceleración del desarrollo** mediante feedback rápido
- **Mejora de la calidad** del código de manera consistente
- **Mayor seguridad** mediante scans automatizados
- **Mejor rendimiento** con monitoring continuo 