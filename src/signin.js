import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// @ts-ignore
export function login(email, password) {
  const auth = getAuth();
  
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('User signed in:', user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing in:', errorCode, errorMessage);
      throw error;
    });
}
