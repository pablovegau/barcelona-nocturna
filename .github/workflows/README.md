# GitHub Actions Workflows

This directory contains the GitHub Actions workflows for the Barcelona Nocturna project.

## 🔍 Visual Regression Tests (`visual-regression-tests.yml`)

This workflow runs automatically on:
- **Pull Requests** to the `main` branch
- **Push** directly to the `main` branch

### What does it do?

1. **Installs dependencies** and Playwright browsers
2. **Builds the project** using unified Node.js configuration
3. **Runs visual tests** (Playwright manages the server automatically)
4. **Compares screenshots** with baselines
5. **Generates reports** and artifacts if there are differences
6. **Comments on the PR** with results automatically

### Possible results

#### ✅ Successful tests
- All screenshots match the baselines
- A comment is added confirming no visual changes

#### ❌ Tests with differences
- Visual changes were detected
- Artifacts are uploaded with:
  - `updated-screenshots`: New generated screenshots
  - `playwright-report`: Detailed HTML report
  - `test-results`: Difference files
- An explanatory comment is added with instructions

### How to interpret failures

If tests fail, review:

1. **Are they intentional changes?** (new design, UI updates)
   - ✅ Download the `updated-screenshots` and use the manual workflow to update them
   
2. **Are they unintentional changes?** (regressions, side effects)
   - ❌ Review your code and fix the issues

## 🔄 Update Visual Baselines (`update-visual-baselines.yml`)

This is a **manual workflow** that allows updating baseline screenshots when you detect legitimate visual changes.

### When to use it

- After approving design changes
- After updating UI components
- When differences in VRT are intentional

### How to run it

1. Go to **Actions** → **Update Visual Baselines**
2. Click **"Run workflow"**
3. Specify the reason for the update
4. The workflow will:
   - Generate new baseline screenshots
   - Commit them automatically if there are changes
   - Provide a summary of the process

### Usage example

```
Reason: "Header design update according to PR #123"
```

## 📁 File structure

```
tests/visual/homepage/
├── homepage.spec.js                     # Playwright tests
└── homepage.spec.js-snapshots/         # Baseline screenshots
    ├── Homepage-Base-view---dark-theme-1-Desktop-Chrome-linux.png
    ├── Homepage-Base-view---dark-theme-1-iPhone-13-linux.png
    ├── Homepage-Base-view-1-Desktop-Chrome-linux.png
    ├── Homepage-Base-view-1-iPhone-13-linux.png
    └── ... (more screenshots for all browser/device/theme combinations)
```

## 🛠️ Configuration

### Astro Configuration
- **Unified Configuration**: Uses `@astrojs/node` adapter for both development and production
- **Server Mode**: Uses `output: 'server'` to support SSR pages like `/characters` with dynamic filtering
- **Build Command**: `npm run build` generates server-ready files for all environments

### Playwright Config
- **Desktop Browsers**: Chrome, Firefox, Safari (all at 1440x900)
- **Mobile Devices**: iPhone 13, iPhone SE, Pixel 5, Galaxy S9+
- **Tablet Devices**: iPad Pro, iPad
- **Test Strategy**: Each test runs across all browser/device combinations (44+ screenshots total) including light/dark themes

### GitHub Actions
- **Node.js**: v18
- **Timeout**: 60 minutes (typical runs: 5-10 minutes)
- **OS**: Ubuntu Latest
- **Retention**: Artifacts are kept for 30 days
- **Server**: Node.js server on port 4321 (Playwright manages automatically)

## 🚨 Troubleshooting

### Server fails to start in CI
- **Cause**: Configuration issues or build problems
- **Solution**: The workflow now uses:
  - Unified configuration with `@astrojs/node` adapter
  - `npm run build` followed by `node ./dist/server/entry.mjs`
  - Build verification step
  - Playwright manages the server automatically

### "Screenshots differ" in CI but work locally
- **Cause**: Differences between operating systems or rendering engines
- **Solution**: Use the manual workflow to generate baselines on the same OS as CI (Linux)

### Very slow tests
- **Cause**: Comprehensive testing across 9 devices × multiple themes = 44+ screenshots
- **Solution**: Tests run in parallel; consider reducing device matrix for routine PRs if needed

### Sporadic failures
- **Cause**: Elements loading asynchronously or network issues in CI
- **Solution**: Tests include automatic retries; check if specific components need longer wait times

### Server connection refused
- **Cause**: Server not accessible or failed to start
- **Solution**: The workflow uses Node.js server which automatically binds to all interfaces and provides better CI compatibility

## 📚 Useful links

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Screenshots Testing](https://playwright.dev/docs/test-screenshots)
- [Astro Node.js Adapter](https://docs.astro.build/en/guides/integrations-guide/node/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)