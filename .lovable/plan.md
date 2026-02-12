

# Fix Blank Screen on iOS

## Root Cause Analysis

After reviewing the code, I found two issues that are likely causing the blank screen:

1. **Misuse of `useState` as an effect** (`src/hooks/useAppFlow.ts`, line 53): `useState()` is being called with a callback to check for payment success on mount. This is incorrect -- it should use `useEffect`. This misuse can cause unpredictable behavior, especially on iOS WebViews.

2. **Missing `forwardRef` on screen components**: The console logs show warnings that `SplashScreen` and other function components are receiving refs from `AnimatePresence`/`motion.div` but cannot accept them. On some iOS WebView versions, this can cause a silent crash.

## Changes

### 1. Fix `useAppFlow.ts` -- Replace `useState` with `useEffect`
- Change the payment-success check from `useState(() => { ... })` to `useEffect(() => { ... }, [])` so it runs correctly as a side effect on mount.

### 2. Wrap screen components with `forwardRef`
- Update `SplashScreen`, `PaymentScreen`, and `TorchScreen` to use `React.forwardRef` so `AnimatePresence` can attach refs without errors.

### 3. Add iOS-safe viewport meta tag
- Update `index.html` to include `viewport-fit=cover` and add a safe-area background color, which prevents rendering issues on notched iPhones.

---

## Technical Details

**File: `src/hooks/useAppFlow.ts`**
- Replace lines 52-62: change `useState(() => { ... })` to `useEffect(() => { ... }, [])`, adding `useEffect` to the imports.

**File: `src/pages/SplashScreen.tsx`**
- Wrap the component with `React.forwardRef`.

**File: `src/pages/PaymentScreen.tsx`**
- Wrap the component with `React.forwardRef`.

**File: `src/pages/TorchScreen.tsx`**
- Wrap the component with `React.forwardRef`.

**File: `index.html`**
- Update the viewport meta tag to: `width=device-width, initial-scale=1.0, viewport-fit=cover`
- Add a background color style to the body to prevent white flash.

