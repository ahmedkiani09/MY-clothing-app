import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/categories-types";

const firebaseConfig = {
  apiKey: "AIzaSyB63OhTwYieB5v5k9Hjm9JOcdne9gVQatE",
  authDomain: "crown-clothing-db-5b5f4.firebaseapp.com",
  projectId: "crown-clothing-db-5b5f4",
  storageBucket: "crown-clothing-db-5b5f4.appspot.com",
  messagingSenderId: "390805473587",
  appId: "1:390805473587:web:c13a890d33cb006e655646",
};

// 1. initializing the app with configuration:
initializeApp(firebaseConfig);

// 2. using google provider to authenticate users:
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// 3. Firestore instance:
export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionsAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapshot) =>
    docSnapshot.data()
  ) as Category[];
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  crteatedAt: Date;
  displayName: string;
  emai: string;
};

// 4. User Documents in database:
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const usersSnapshot = await getDoc(userDocRef);

  console.log(usersSnapshot.exists());

  //   if the userDocRef do not exists:
  if (!usersSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log("error creating user", err);
    }
  }

  //  if userDocRef do exists:
  return usersSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return signOut(auth);
};

export const ourAuthStateChangedListener = (
  callbackFn: NextOrObserver<User>
) => {
  onAuthStateChanged(auth, callbackFn);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
