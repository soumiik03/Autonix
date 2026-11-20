import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { login } from "../features/auth";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { Brand } from "./Brand";

export function LoginForm() {
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try { const result = await signInWithPopup(auth, googleAuthProvider); const token = await result.user.getIdToken(); dispatch(setUserData(await login(token))); }
    catch (error) { console.error("Google login failed:", error); }
  };
  return <button className="button google-button" onClick={handleGoogleLogin} type="button"><Brand /> Continue with Google</button>;
}
