import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB63OhTwYieB5v5k9Hjm9JOcdne9gVQatE",
  authDomain: "crown-clothing-db-5b5f4.firebaseapp.com",
  projectId: "crown-clothing-db-5b5f4",
  storageBucket: "crown-clothing-db-5b5f4.appspot.com",
  messagingSenderId: "390805473587",
  appId: "1:390805473587:web:c13a890d33cb006e655646",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const usersSnapshot = await getDoc(userDocRef);
  console.log(usersSnapshot);
  console.log(usersSnapshot.exists());

  // if the userDocRef exists:
  if (!usersSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.error("There was a problem creating the reference:", err.message);
    }
  }

  return userDocRef;
};
