# Firebase Setup Guide

## Current Error: `auth/unauthorized-domain`

This error occurs because the current domain (v0 preview URL) is not authorized in your Firebase Console.

## How to Fix

### Step 1: Add Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **assignment-3-ee6fd**
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add your current domain:
   - For v0 preview: Add the full domain shown in your browser (e.g., `*.v0.app` or the specific subdomain)
   - For localhost: `localhost` (usually already added)
   - For production: Add your production domain when deploying

### Step 2: Enable Sign-In Methods

Make sure the following sign-in methods are enabled in Firebase Console:

1. Go to **Authentication** → **Sign-in method**
2. Enable **Google** provider:
   - Click on Google
   - Toggle "Enable"
   - Add your support email
   - Save
3. Enable **GitHub** provider (optional):
   - Click on GitHub
   - Toggle "Enable"
   - Add Client ID and Client Secret from GitHub OAuth App
   - Save
4. Enable **Email/Password** provider:
   - Click on Email/Password
   - Toggle "Enable"
   - Save

### Step 3: Test the Authentication

After adding the authorized domain and enabling sign-in methods:

1. Refresh your v0 preview
2. Try signing in with Google or GitHub
3. The authentication should now work!

## Environment Variables (For Production)

When deploying to production, make sure to add these environment variables:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDM83rmL9YKLDClKNdi6S8Z6HWGhgOJzNo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=assignment-3-ee6fd.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=assignment-3-ee6fd
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=assignment-3-ee6fd.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=692709911526
NEXT_PUBLIC_FIREBASE_APP_ID=1:692709911526:web:47e9ff94d0a8c50cd7c427
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-39JYQ0793Q
\`\`\`

## Troubleshooting

### Popup Blocked
If you see "Popup blocked" error:
- Allow popups for this site in your browser settings
- Try again

### Configuration Not Found
If you see "Configuration not found" error:
- Make sure the sign-in method is enabled in Firebase Console
- Check that you've saved the configuration

### Still Having Issues?
- Clear your browser cache and cookies
- Try in an incognito/private window
- Check the browser console for detailed error messages
