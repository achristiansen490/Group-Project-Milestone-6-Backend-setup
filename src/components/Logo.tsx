import { Sun, TreePine, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    md: { icon: 26, text: "text-2xl" },
    lg: { icon: 34, text: "text-4xl" },
  };

  const s = sizes[size];

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Sun
          size={s.icon}
          className="text-sunshine transition-transform group-hover:rotate-45 duration-500"
          strokeWidth={2.5}
        />
        <TreePine
          size={s.icon * 0.6}
          className="absolute -bottom-1 -right-1 text-primary"
          strokeWidth={2.5}
        />
      </div>
      <span className={`${s.text} font-display font-bold text-foreground`}>
        Outside<span className="text-primary"> Today</span>
      </span>
    </Link>
  );
};

export default Logo;
