import { doc as doc, getDoc, setDoc } from "firebase/firestore";
import { db } from ".";

export const addData = async (col:string, id:string, payload:any, morePath?:string[]) => {
  await setDoc(doc(db, col, id, ...(morePath ? morePath : [])), payload);
}

export const getData = async (col:string, id:string, morePath?:string[]) => {
  const docRef = doc(db, col, id, ...(morePath ? morePath : []));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}