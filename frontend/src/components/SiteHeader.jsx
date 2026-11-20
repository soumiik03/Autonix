import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth";
import { setUserData } from "../../redux/userSlice";
import { Brand } from "./Brand";
import { Button } from "./ui/button";

export function SiteHeader() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    dispatch(setUserData(null));
    navigate("/login");
  };
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <Brand /> AUTONIX
      </Link>
      <nav className="header-actions" aria-label="Main navigation">
        <Link className="nav-link" to="/agents">
          Agents
        </Link>
        <Link className="nav-link" to="/integration">
          Integrations
        </Link>
        <span className="nav-divider" aria-hidden="true" />
        <Button
          variant="ghost"
          className="nav-link nav-button h-auto px-0 py-0 font-normal"
          onClick={signOut}
        >
          Sign out
        </Button>
        {user?.profilePicture && (
          <img className="nav-avatar" src={user.profilePicture} alt="" />
        )}
      </nav>
    </header>
  );
}
