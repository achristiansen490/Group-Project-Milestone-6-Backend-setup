import { Link, useLocation } from "react-router-dom";
import { Home, Target, Trophy, Compass, User } from "lucide-react";
import Logo from "./Logo";

const AppNav = () => {
  const location = useLocation();
  const isParentView = location.pathname.startsWith("/parent");

  const navItems = [
    { to: isParentView ? "/parent" : "/child", label: "Dashboard", icon: Home },
    { to: "/activities", label: "Activities", icon: Compass },
    { to: isParentView ? "/parent/goals" : "/goals", label: "Goals", icon: Target },
    { to: isParentView ? "/parent/rewards" : "/rewards", label: "Rewards", icon: Trophy },
    { to: "/profiles", label: "Profiles", icon: User },
  ];

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex items-center justify-between px-6 py-3 bg-card shadow-soft sticky top-0 z-50">
        <Logo size="sm" />
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card shadow-soft border-t z-50 px-2 py-1 safe-bottom">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default AppNav;
