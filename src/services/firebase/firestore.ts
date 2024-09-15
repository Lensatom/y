import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from ".";

export const addData = async (col:string, id:string, payload:any, morePath?:string[]) => {
  if (id === "auto") {
    const docRef = await addDoc(collection(db, col, ...(morePath ? morePath : [])), {
      ...payload,
      createdAt: serverTimestamp()
    });
    const id = docRef.id
    await updateData(col, id, {id})
  } else {
    await setDoc(doc(db, col, id, ...(morePath ? morePath : [])), {
      ...payload,
      createdAt: serverTimestamp(),
      id
    });
  }
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

export const dataExists = async (col:string, id:string, morePath?:string[]) => {
  const docRef = doc(db, col, id, ...(morePath ? morePath : []));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}

export const getCollection = async (col:string, conditions:any[], morePath?:string[]) => {
  const dataCollection:any[] = []
  
  const q = query(collection(db, col, ...(morePath ? morePath : [])), ...(conditions));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    dataCollection.push(doc.data())
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
  });

  return dataCollection
}

export const updateData = async (col:string, id:string, payload:any, morePath?:string[]) => {
  const docRef = doc(db, col, id, ...(morePath ? morePath : []));
  await updateDoc(docRef, {
    ...payload,
    updatedAt: serverTimestamp()
  });
}

export const deleteData = async (col:string, id:string, morePath?:string[]) => {
  const docRef = doc(db, col, id, ...(morePath ? morePath : []));
  await deleteDoc(docRef)
}