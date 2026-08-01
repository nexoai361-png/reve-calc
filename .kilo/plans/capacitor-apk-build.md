# Plan: Capacitor Integration + GitHub Actions APK Build

## Goal
Add Capacitor so the calculator can be built as an Android APK via GitHub Actions without errors.

## Changes

### 1. Create `package.json`
- Add Capacitor core and CLI as devDependencies: `@capacitor/core`, `@capacitor/cli`
- Add Android platform: `@capacitor/android`
- Add build script: `"build": "echo 'no build step needed — static HTML'"` 
- Add Capacitor sync script: `"capacitor:sync": "npx cap sync"`
- Set `main` to `index.html`

### 2. Create `capacitor.config.ts`
- `appId`: `com.calculator.app`
- `appName`: `Calculator`
- `webDir`: `.` (index.html is at repo root)
- `server`: `androidScheme: 'https'`
- `bundledWebRuntime`: `false`

### 3. Create `.github/workflows/build-apk.yml`
- Trigger: `push` on `main` branch
- Runs on `ubuntu-latest`
- Steps:
  1. Checkout code
  2. Setup Node.js (20.x)
  3. Install dependencies (`npm ci`)
  4. Sync Capacitor (`npx cap sync`)
  5. Setup Java JDK 17 (required for Android build)
  6. Setup Android SDK (using `android-actions/setup-android` or `gradle` action)
  7. Accept Android licenses (`yes | sdkmanager --licenses`)
  8. Build APK (`cd android && ./gradlew assembleDebug`)
  9. Upload APK as artifact (`actions/upload-artifact`)

### 4. Create `android/` directory structure
- Capacitor will generate this on first `npx cap add android`
- Since we can't run `npx cap add android` in this environment (no node_modules yet), the workflow will handle it
- We need a minimal `android/` directory with at least a `build.gradle` and `settings.gradle` to avoid errors
- Actually, Capacitor creates the full Android project on `cap add`. The CI workflow should run `npx cap add android` if the directory doesn't exist, or we can commit the generated Android project

### 5. Commit the Android project
- Run `npx cap add android` locally (or simulate the generated structure)
- Commit the `android/` directory so the CI doesn't need to generate it
- This avoids issues with missing Android project files in CI

### 6. Update `.gitignore`
- Add `node_modules/`, `android/app/build/`, `android/build/`

## Key Decisions
- **Android project**: Commit the generated `android/` directory to the repo so CI doesn't need to generate it from scratch (avoids SDK/license issues in CI)
- **Web directory**: `webDir: "."` since index.html is at repo root
- **JDK version**: JDK 17 (required by modern Android Gradle Plugin)
- **APK type**: `assembleDebug` for CI builds; `assembleRelease` would need keystore config (out of scope)

## Verification
- Push to GitHub and verify the Actions workflow runs without errors
- Download the APK artifact and confirm it exists
- Verify the calculator UI renders correctly in the Android WebView