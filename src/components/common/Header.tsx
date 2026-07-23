import React, { useState } from "react";
import { FaCog, FaUserCircle, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import AuthManager from "../../shared/utilities/UserManager.ts";

interface HeaderProps {
  children?: React.ReactNode;
  showCreateButton?: boolean;
  onLogoClick?: () => void;
}

export default function Header({
  children,
  showCreateButton = false,
  onLogoClick,
}: HeaderProps) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    AuthManager.logout();
    navigate("/auth");
  };

  return (
    <nav className="border-b border-outline-variant/45 bg-surface-container-lowest/90 backdrop-blur-xl relative z-25">
      <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between px-5 py-3">
        <div className="flex h-full items-center gap-8">
          <span
            onClick={handleLogoClick}
            className="text-headline-md font-semibold text-on-surface cursor-pointer transition-colors hover:text-primary"
          >
            Revisor
          </span>
        </div>

        {children && <div className="flex-1 flex justify-center px-6">{children}</div>}

        <div className="flex items-center gap-5 relative">
          {showCreateButton && (
            <button
              onClick={() => navigate("/create")}
              className="
                  flex items-center gap-2
                  rounded-lg px-5 py-3
                  text-label-sm font-medium
                  text-on-primary-container
                  bg-primary-container
                  border border-primary/30
                  shadow-[0_12px_32px_rgba(77,142,255,0.22)]
                  transition
                  hover:brightness-110
                  active:scale-95
                  cursor-pointer
                "
            >
              <FaPlus className="text-sm" />
              Create Item
            </button>
          )}

          <button
            onClick={() => setIsProfileOpen((previous) => !previous)}
            className="grid size-10 place-items-center rounded-full overflow-hidden border border-outline/30 bg-surface-container text-on-surface-variant active:scale-95 transition hover:border-primary hover:text-on-surface cursor-pointer"
            aria-label="Profile"
          >
            <FaUserCircle className="size-7" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-surface-container-high/95 backdrop-blur-xl border border-outline/25 rounded-lg shadow-2xl overflow-hidden z-50">
              <div className="py-2">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-highest transition-colors text-label-sm text-left cursor-pointer">
                  <FaCog className="text-base" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-error hover:bg-error-container/20 transition-colors text-label-sm text-left cursor-pointer font-medium">
                  <FaSignOutAlt className="text-base" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
