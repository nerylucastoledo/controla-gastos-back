// src/services/FirebaseService.ts

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  Auth,
  UserCredential
} from "firebase/auth";
import admin, { ServiceAccount } from "firebase-admin";

class FirebaseService {
  private auth: Auth;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    };

    initializeApp(firebaseConfig);
    this.auth = getAuth();

    this.initializeAdminSDK();
  }

  private initializeAdminSDK(): void {
    const serviceAccount: ServiceAccount = {
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  public getAuthInstance(): Auth {
    return this.auth;
  }

  public async registerUser(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password)
    .catch(() => {
      throw new Error("Ocorreu um erro interno. Tente novamente")
    });

    if (this.auth.currentUser) {
      await sendEmailVerification(this.auth.currentUser);
    }
  }

  public async loginUser(email: string, password: string): Promise<string> {
    const userCredential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password)
    .catch(() => {
      throw new Error("Usuário ou senha incorreto.")
    });
    const idToken: string = await userCredential.user.getIdToken();
    return idToken;
  }

  public async logoutUser(): Promise<void> {
    await signOut(this.auth)
    .catch(() => {
      throw new Error("Ocorreu um erro interno. Tente novamente")
    });;
  }

  public async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email)
    .catch(() => {
      throw new Error("Ocorreu um erro interno. Tente novamente")
    });;
  }

  public getAdminInstance() {
    return admin;
  }
}

export default new FirebaseService();