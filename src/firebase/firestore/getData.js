// getData.js
import firebase_app from "@/firebase/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocument(collectionName) {
  const dataCollectionRef = collection(db, collectionName);

  let result = null;
  let error = null;

  try {
    const querySnapshot = await getDocs(dataCollectionRef);
    result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
