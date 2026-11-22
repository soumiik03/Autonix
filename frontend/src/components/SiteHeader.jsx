import { useState } from "react";
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
  const [avatarError, setAvatarError] = useState(false);
  const signOut = async () => {
    try {
      await logout();
    } finally {
      dispatch(setUserData(null));
      navigate("/login");
    }
  };
  const avatarLabel = user?.name || user?.email || "A";
  const showProfilePicture = user?.profilePicture && !avatarError;

  return (
    <header className="site-header h-[72px] border-b border-[#f0f0f0] px-6 sm:px-8 lg:px-12">
      <Link to="/" className="brand shrink-0 font-bold transition-opacity duration-200 hover:opacity-70">
        <Brand /> AUTONIX
      </Link>
      <nav className="header-actions gap-6 sm:gap-8" aria-label="Main navigation">
        <Link className="nav-link whitespace-nowrap text-[15px] font-medium" to="/agents">
          Agents
        </Link>
        <Link className="nav-link whitespace-nowrap text-[15px] font-medium" to="/integration">
          Integrations
        </Link>
        <span className="nav-divider mx-1" aria-hidden="true" />
        <Button
          variant="ghost"
          className="nav-link nav-button h-auto px-0 !pb-[6px] text-[15px] font-medium whitespace-nowrap hover:!bg-transparent"
          onClick={signOut}
        >
          Sign out
        </Button>
        {showProfilePicture ? (
          <img className="nav-avatar" src={user.profilePicture} alt="" onError={() => setAvatarError(true)} />
        ) : (
          <span className="nav-avatar nav-avatar-fallback" aria-label={avatarLabel}>
            {avatarLabel.slice(0, 1).toUpperCase()}
          </span>
        )}
      </nav>
    </header>
  );
}
