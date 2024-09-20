import { ref, uploadBytes } from "firebase/storage";
import { storage } from ".";
import { getImageURL } from "@/helpers";


export const uploadFile = async (file:any, id:string) => {
  const storageRef = ref(storage, id);
  const snapshot = await uploadBytes(storageRef, file)
  const URL = await getImageURL(snapshot.metadata.name)
  return URL
} 