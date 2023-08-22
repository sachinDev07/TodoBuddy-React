import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const Auth = () => {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      } else {
        toast.done("Already have this email address");
      }

      navigate("/todo");
    } catch (error) {
      toast.error("Couldn't authorize with Google");
    }
  };
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="w-full flex items-center justify-center px-7 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg active:bg-red-800 uppercase rounded transition duration-200 ease-in-out"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" /> Continue with
      google
    </button>
  );
};

export default Auth;
