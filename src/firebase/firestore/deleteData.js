import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);

export default async function deleteData(id) {
  const projectDoc = doc(db, "projects", id);
  let result = null;
  let error = null;
  try {
    result = await deleteDoc(projectDoc);
    alert("Data berhasil dihapus");
  } catch (e) {
    error = e;
  }
  return { result, error };
}
