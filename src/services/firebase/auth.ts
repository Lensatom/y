import { signInWithPopup } from "firebase/auth";
import { auth, provider } from ".";
import { addData, dataExists, getCollection } from "./firestore";
import { where } from "firebase/firestore";

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const userExists = await dataExists("users", user.uid)

      if (userExists) {
        const userData = await getCollection("users", [where("handle", "!=", null)])
        if (userData[0].handle) {
          document.location.href = '/home'
          return
        } else {
          document.location.href = '/chooseHandle'
          return
        }
      }

      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        handle: null
      }
      await addData("users", user.uid, userData)
      document.location.href = '/chooseHandle'
    }).catch((error) => {
      console.log(error)
    });
}