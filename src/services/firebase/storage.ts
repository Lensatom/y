import { ref, uploadBytes } from "firebase/storage";
import { storage } from ".";


export const uploadFile = async (file:any, id:string) => {
  const storageRef = ref(storage, id);
  const snapshot = await uploadBytes(storageRef, file)
  console.log('Uploaded a blob or file!');
  console.log(snapshot)
} 