# React Native — Theory

## React Native vs a native app

A fully native app (Swift for iOS, Kotlin for Android) compiles directly
to machine code and uses the platform's UI components without any
intermediary layer. Every pixel is drawn by the operating system.

React Native sits between a web app and a native app. JavaScript runs in
a separate thread and communicates with the native UI thread through a
bridge (or the newer JSI — JavaScript Interface). When you write `<View>`,
React Native does not render an HTML div inside a WebView. It sends
instructions to the native layer to create a real UIView (iOS) or
android.view.View (Android). The result looks and feels native because
it IS native UI — but the logic is written in JavaScript.

**The two threads:**
- **JS thread** — runs your React components, Zustand store, event handlers
  and business logic. If this thread blocks (heavy computation, large loops),
  the UI freezes.
- **UI thread (native)** — renders the actual native components on screen.
  Animations that run entirely on the UI thread (via Reanimated worklets)
  stay smooth even when the JS thread is busy.

**Practical consequence:** never run heavy synchronous operations in a
component render or an event handler. Use `useEffect` with async functions,
move computation off the main thread, and keep renders fast.

## Metro bundler

Metro is the JavaScript bundler that ships with React Native and Expo.
It is equivalent to Vite or Webpack in a web project — it takes your
TypeScript source files, resolves imports, transforms the code and
packages it for the device.

Metro runs a local server (usually on port 8081) that the app connects
to during development. When you save a file, Metro recompiles only the
changed module and sends the update to the device via Fast Refresh,
which updates the UI without losing component state.

Key Metro concepts:
- **Bundle** — the single JS file that contains your entire app
- **Hot reload / Fast Refresh** — updates individual modules without
  a full reload
- **Asset resolution** — handles images, fonts and other static files

## Expo Go vs Development Build

**Expo Go** is a pre-built app published by Expo on the App Store and
Google Play. It contains a fixed set of native modules. You scan a QR
code and your JavaScript bundle runs inside Expo Go's native shell.

This is fast and requires no compilation, but it has a hard limitation:
you cannot add custom native modules. If your app needs push notifications
(expo-notifications), biometric authentication, background tasks or any
third-party SDK with native code, Expo Go cannot run it.

**Development Build** is a custom binary of your own app, compiled with
EAS Build (Expo Application Services). It includes exactly the native
modules your project needs. You install it on your device like a real app
and it connects to the Metro server the same way Expo Go does.

In professional projects, Development Build is always used from the start
because it matches production behaviour exactly. Expo Go is only suitable
for learning, prototyping or projects that use exclusively the modules
pre-included in the Expo Go shell.

For this project, Expo Go with SDK 54 is used because all required
modules (AsyncStorage, Haptics, Reanimated) are included in the SDK 54
Expo Go shell.

## Systems of design

### Gluestack UI
A utility-first component library inspired by Tailwind CSS. Highly
customisable, good for unique visual identities. However, Gluestack UI v1
is not compatible with React 19, which caused dependency conflicts with
Expo SDK 56.

### React Native Paper
An implementation of Material Design for React Native, maintained by
Callstack. It provides ready-to-use components (Button, Card, TextInput,
FAB) that follow Material Design guidelines and integrate well with both
Android and iOS.

**Why React Native Paper was chosen for NoteFlow:**
- Full compatibility with Expo SDK 54 and React 18
- No dependency conflicts
- Ready-to-use components reduce boilerplate
- Built-in dark and light theme support via PaperProvider
- Well maintained with active community support