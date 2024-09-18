import { signInWithPopup } from "firebase/auth";
import { auth, provider } from ".";
import { addData } from "./firestore";

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }
      await addData("users", user.uid, userData)
    }).catch((error) => {
      console.log(error)
    });
}