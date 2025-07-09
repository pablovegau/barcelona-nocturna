# GitHub Actions Workflows

This directory contains the GitHub Actions workflows for the Barcelona Nocturna project.

## 🔍 Visual Regression Tests (`visual-regression-tests.yml`)

This workflow runs automatically on:
- **Pull Requests** to the `main` branch
- **Push** directly to the `main` branch

### What does it do?

1. **Installs dependencies** and Playwright browsers
2. **Builds the project** and starts the preview server
3. **Runs visual tests** comparing current screenshots with baselines
4. **Generates reports** and artifacts if there are differences
5. **Comments on the PR** with results automatically

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
    ├── Homepage-Base-view-1-Desktop-Chrome-darwin.png
    ├── Homepage-Base-view-1-iPhone-13-darwin.png
    └── ... (more screenshots for different devices)
```

## 🛠️ Configuration

### Playwright Config
- **Browsers**: Chrome, Firefox, Safari
- **Devices**: Desktop (1440x900), iPad Pro, iPad, iPhone 13, iPhone SE, Pixel 5, Galaxy S9+
- **Conditional tests**: Mobile menu tests only run on mobile devices

### GitHub Actions
- **Node.js**: v18
- **Timeout**: 60 minutes
- **OS**: Ubuntu Latest
- **Retention**: Artifacts are kept for 30 days

## 🚨 Troubleshooting

### Server fails to start in CI
- **Cause**: Preview server not starting properly in GitHub Actions
- **Solution**: Check server logs in the workflow output. The workflow now includes:
  - Build verification step
  - Enhanced server startup with host binding (`--host 0.0.0.0`)
  - Detailed logging and better error handling
  - Server logs displayed on failure

### "Screenshots differ" in CI but work locally
- **Cause**: Differences between operating systems (macOS vs Linux)
- **Solution**: Use the manual workflow to generate baselines on the same OS as CI

### Very slow tests
- **Cause**: Many configured devices
- **Solution**: Consider reducing the device matrix for routine PRs

### Sporadic failures
- **Cause**: Elements loading asynchronously
- **Solution**: Review that tests properly wait for dynamic content

### Server connection refused
- **Cause**: Preview server not binding to correct interface in CI
- **Solution**: The workflow now uses `--host 0.0.0.0` to ensure server is accessible

## 📚 Useful links

- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Visual Testing Best Practices](https://playwright.dev/docs/test-screenshots) 