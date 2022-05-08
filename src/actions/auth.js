import { types } from "../type/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, setError, startLoading } from "./ui";

import Swal from 'sweetalert2'
import { noteLogout } from "./notes";


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password).then( ({ user }) => {
            console.log(`User ${user.uid} | auth.js`);
            setTimeout(() => {
                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );
            }, 1500);
          }).catch( error => {
            console.log(error.message);
            dispatch( finishLoading() );
            Swal.fire('Error', error.message, 'error');
          });
    };
};


export const startGoogleLogin = () => {
    return ( dispatch ) => {
      firebase.auth().signInWithPopup(  googleAuthProvider  )
        .then( ({user}) => {
        //   console.log(user);
          dispatch( login(user.uid, user.displayName) );
        }).catch( error => {
            console.log(error);
        });
    }
}

export const login = (uuid, name) => ({

    type: types.login,
    payload: {
        uuid,
        name,
    }
});


export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {


         // * createUserWithEmailAndPassword autentica al usuario de una vez
        firebase.auth().createUserWithEmailAndPassword(email, password).then( async({ user }) => {
          console.log(user);

          // ? actualizamos de una vez el displayName porque no se lo devuelve por defecto cuando se crea el usuario en firebase
          await user.updateProfile({displayName: name});
          dispatch( login(user.uid, user.displayName) );
        }).catch( error => {
          console.log(error.message);
          Swal.fire('Error', error.message, 'error');
        } );

    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()

        dispatch( logout() );
        dispatch( noteLogout());
    };
};

export const logout = () => ({
  type: types.logout
});