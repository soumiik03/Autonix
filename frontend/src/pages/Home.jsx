import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bot, LogOut, Plus, SlidersHorizontal, Workflow } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth";
import { setUserData } from "../../redux/userSlice";

const menuPanel =
  "rounded-2xl border border-white/[0.09] bg-[#17191e] p-1.5 text-[#e2e5e9] shadow-[0_24px_70px_rgba(0,0,0,0.6)]";

export const Home = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const displayName = userData?.name || "Your account";
  const avatarInitial = displayName.charAt(0).toUpperCase();
  const [profileImageError, setProfileImageError] = useState(false);
  const profilePicture = userData?.profilePicture && !profileImageError;

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      dispatch(setUserData(null));
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0c0f] text-[#e2e5e9]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-12%,rgba(190,198,208,0.12),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(190,198,208,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(190,198,208,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
      />

      <header className="relative z-10 flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <svg
            aria-hidden="true"
            className="size-9 text-[#c9d2dc]"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M20 3.5 35 12v16L20 36.5 5 28V12L20 3.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
            <path
              d="M13 27V13l14 14V13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          <span className="text-[13px] font-semibold tracking-[0.24em] text-[#e5e7eb]">
            AUTONIX
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open workspace menu"
              className="flex size-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.045] text-[#d6dae0] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-white/20 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5cbd3]/50"
            >
              <Workflow className="size-[18px]" strokeWidth={1.8} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`w-56 ${menuPanel}`}>
              <DropdownMenuItem className="cursor-pointer rounded-xl bg-[#e7e9ed] px-3 py-3 text-sm font-medium text-[#17191e] focus:bg-[#e7e9ed] focus:text-[#17191e]">
                <Bot className="size-4 text-[#4c5560]" />
                My Agents
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5 bg-white/[0.08]" />
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-[#cbd0d7] focus:bg-white/[0.07] focus:text-white">
                <Plus className="size-4 text-[#9fa7b1]" />
                Create New Agent
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5 bg-white/[0.08]" />
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-[#cbd0d7] focus:bg-white/[0.07] focus:text-white">
                <SlidersHorizontal className="size-4 text-[#9fa7b1]" />
                Integration
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open account menu"
              className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.07] text-sm font-medium text-[#d9dde3] transition hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5cbd3]/50"
            >
              {profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt=""
                  className="size-full object-cover"
                  onError={() => setProfileImageError(true)}
                />
              ) : (
                avatarInitial
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`w-64 ${menuPanel}`}>
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-3 py-2.5">
                  <span className="block truncate text-sm font-medium text-[#e8eaed]">
                    {displayName}
                  </span>
                  <span className="mt-1 block truncate text-xs font-normal text-[#858c96]">
                    {userData?.email || "No email available"}
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-1 bg-white/[0.08]" />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={logoutLoading}
                variant="destructive"
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-[#db8188] focus:bg-rose-500/10 focus:text-[#f19ba1]"
              >
                <LogOut className="size-4 text-[#db8188]" />
                {logoutLoading ? "Signing out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </main>
  );
};
