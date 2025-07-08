import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseStorageConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_MEASUREMENT_ID,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const appStorage =
  getApps().find((app) => app.name === "storage-app") ||
  initializeApp(firebaseStorageConfig, "storage-app");

export const auth = getAuth(app);
export const storage = getStorage(appStorage);
