import firebase_app from "../config";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(
  id,
  name,
  description,
  image,
  sourceCodeLink,
  tags
) {
  const projectCollectionRef = collection(db, id);
  let result = null;
  let error = null;
  try {
    result = await addDoc(projectCollectionRef, {
      name: name,
      description: description,
      image: image,
      source_code_link: sourceCodeLink,
      tags: tags,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
