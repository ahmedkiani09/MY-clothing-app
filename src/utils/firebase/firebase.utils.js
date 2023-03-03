import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
} from "firebase/firestore";

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

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCollectionsAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// 4. User Documents in database:
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
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
      if (err.code === "auth/email-already-in-use") {
        alert("Can not create user, email already in use");
      } else {
        console.error(
          "There was a problem creating the reference:",
          err.message
        );
      }
    }
  }

  //  if userDocRef do exists:
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return signOut(auth);
};

export const ourAuthStateChangedListener = (callbackFn) => {
  onAuthStateChanged(auth, callbackFn);
};
