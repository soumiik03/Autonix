import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { auth, googleAuthProvider } from "../firebase";
import { login } from "../features/auth";
import { setUserData } from "../../redux/userSlice";

export function LoginForm() {
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      dispatch(setUserData(await login(await result.user.getIdToken())));
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };
  return (
    <Button
      className="h-11 w-full rounded-full bg-[#171717] px-6 text-base text-white hover:bg-black"
      onClick={handleGoogleLogin}
    >
      Continue with Google
    </Button>
  );
}
