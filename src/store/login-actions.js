import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { userActions } from './user-slice';
import { toast } from 'react-toastify';

const provider = new GoogleAuthProvider();

export const signInAPI = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          userActions.setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        toast.success('Login successfully 👍');
      })
      .catch((error) => {
        toast.error(`Couldn't signin ☹️`);
      });
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userActions.setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
      }
    });
  };
};

export const signOutAPI = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        toast.success('Signout successfully 👍');
        dispatch(userActions.setUser(null));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
