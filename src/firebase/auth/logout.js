import { getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const auth = getAuth(firebase_app);

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const percobaanLogout = async () => {
      await signOut(auth);
      console.log("Log Out Success");
      router.push("/");
    };

    percobaanLogout(); // Call the function once when the component mounts

    // Note: If you need to perform actions on component unmount, you can return a cleanup function here
  }, [router]);
};
export default Logout;
