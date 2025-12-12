import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDM83rmL9YKLDClKNdi6S8Z6HWGhgOJzNo",
  authDomain: "assignment-3-ee6fd.firebaseapp.com",
  projectId: "assignment-3-ee6fd",
  storageBucket: "assignment-3-ee6fd.firebasestorage.app",
  messagingSenderId: "692709911526",
  appId: "1:692709911526:web:47e9ff94d0a8c50cd7c427",
  measurementId: "G-39JYQ0793Q",
}

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)

let analytics = null
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

export { app, auth, analytics }
