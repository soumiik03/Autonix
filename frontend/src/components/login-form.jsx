import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { auth, googleAuthProvider } from "../firebase";
import { login } from "../features/auth";
import { setUserData } from "../../redux/userSlice";

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = await login(await result.user.getIdToken());
      dispatch(setUserData(user));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };
  return (
    <Button
      className="h-12 w-full rounded-[14px] bg-[#171717] px-6 text-[18px] font-normal leading-[1.33] tracking-[-0.025em] text-white shadow-none transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2"
      onClick={handleGoogleLogin}
    >
      Continue with Google
    </Button>
  );
}
