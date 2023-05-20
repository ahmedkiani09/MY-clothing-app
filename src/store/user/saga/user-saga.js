import { all, call, put, takeLatest } from "redux-saga/effects"; // side effects

import { USER_ACTION_TYPES } from "../user.types";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "../user-action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../../utils/firebase/firebase.utils";

export const getSnapshotFromUserAuth = function* (userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
};

// signIn process
export const signInWithEmail = function* ({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
};

export const signInWithGoogle = function* () {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
};

// signUp process
export const signUp = function* ({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
};

export const signInAfterSignUp = function* ({
  payload: { user, additionalDetails },
}) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
};

// sign out process:
export const signOut = function* () {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
};

// checking for authentication
export const isUserAuthenticated = function* () {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
};

export const onCheckUserSession = function* () {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

// sign in process:
export const onEmailSignInStart = function* () {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
};

export const onGoogleSignInStart = function* () {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

// sign up process:
export const onSignUpStart = function* () {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
};

export const onSignUpSuccess = function* () {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
};

// sign out process:
export const onSignOutStart = function* () {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
};

// user saga:
export const userSagas = function* () {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
};
