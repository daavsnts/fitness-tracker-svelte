import { initializeApp, type FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { type Auth, getAuth } from "firebase/auth";

export class FirebaseService {
  private _app: FirebaseApp;
  private _db: Firestore;
  private _auth: Auth;
  private _firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  constructor() {
    this._app = initializeApp(this._firebaseConfig);
    this._db = getFirestore(this._app);
    this._auth = getAuth(this._app);
  }

  get db() {
    return this._db;
  }

  get auth() {
    return this._auth;
  }
}
