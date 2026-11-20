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
    <header className="site-header h-[72px] border-b border-[#f0f0f0] px-6 sm:px-8 lg:px-12">
      <Link to="/" className="brand shrink-0 font-bold transition-opacity duration-200 hover:opacity-70">
        <Brand /> AUTONIX
      </Link>
      <nav className="header-actions gap-6 sm:gap-8" aria-label="Main navigation">
        <Link className="nav-link whitespace-nowrap text-[15px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:!text-[#737373]" to="/agents">
          Agents
        </Link>
        <Link className="nav-link whitespace-nowrap text-[15px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:!text-[#737373]" to="/integration">
          Integrations
        </Link>
        <span className="nav-divider mx-1" aria-hidden="true" />
        <Button
          variant="ghost"
          className="nav-link nav-button h-auto px-0 py-0 text-[15px] font-medium whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:!bg-transparent hover:!text-[#737373]"
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
