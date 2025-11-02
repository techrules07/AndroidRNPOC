# AndroidRNPOC

Hybrid proof-of-concept that embeds a React Native screen inside a Jetpack Compose
Android application. The Compose home screen contains a button that launches a
`ReactNativeActivity`, which renders the JavaScript component registered as
`HybridScreen`.

## Project layout

- `app/` - Native Android module (Compose). Contains `MainActivity`,
  `ReactNativeActivity`, and the `MainApplication` that hosts React Native.
- `reactnative/` - Standalone React Native project with Metro configuration and
  the JavaScript entry point (`index.js`).

## Getting started

### 1. Install dependencies for the React Native bundle

```sh
cd reactnative
npm install
```

### 2. Option A - run with Metro (development)

In one terminal:

```sh
npm start
```

Launch the Android app (via Android Studio or `./gradlew installDebug`). The
React Native runtime will connect to the Metro server automatically. When
running on an Android emulator use `adb reverse tcp:8081 tcp:8081` if needed.

### 2. Option B - create an offline Android bundle

```sh
npm run android:bundle
```

This command outputs `app/src/main/assets/index.android.bundle` and copies
static assets into `app/src/main/res`. Rebuild the Android app afterward to ship
the bundled React Native experience without Metro.

### 3. Build the Android app

From the repository root:

```sh
./gradlew assembleDebug
```

Install the resulting APK or run `./gradlew installDebug`. Launch the app and
tap **Open React Native Screen** to navigate from Compose to the embedded React
Native UI.
