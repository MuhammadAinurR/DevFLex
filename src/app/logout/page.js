"use client";
import { useEffect } from "react";
import logOut from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();
  logOut();
  return (
    <div>
      Logging out...
      {/* You can add a loading spinner or other UI elements here */}
    </div>
  );
}

export default Logout;
