import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, ShieldCheck, Smile } from "lucide-react";
import Logo from "@/components/Logo";

const profiles = [
  {
    id: "parent",
    name: "Mom",
    role: "parent" as const,
    avatar: "👩",
    to: "/parent",
  },
  {
    id: "child1",
    name: "Emma",
    role: "child" as const,
    avatar: "👧",
    to: "/child",
  },
  {
    id: "child2",
    name: "Jake",
    role: "child" as const,
    avatar: "👦",
    to: "/child",
  },
];

const ProfileSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <header className="flex items-center justify-center px-6 py-6">
        <Logo size="md" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Who's going outside?
          </h1>
          <p className="text-muted-foreground text-lg">
            Pick your profile to get started
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-2xl w-full">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={profile.to}
                className="group flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-card hover:shadow-playful transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
                    profile.role === "parent"
                      ? "bg-secondary"
                      : "bg-sunshine/20"
                  }`}
                >
                  {profile.avatar}
                </div>
                <span className="font-display font-bold text-lg">
                  {profile.name}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                    profile.role === "parent"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-nature-light text-primary"
                  }`}
                >
                  {profile.role === "parent" ? (
                    <ShieldCheck size={12} />
                  ) : (
                    <Smile size={12} />
                  )}
                  {profile.role === "parent" ? "Parent" : "Kid"}
                </span>
              </Link>
            </motion.div>
          ))}

          {/* Add profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button className="w-full flex flex-col items-center gap-3 p-6 bg-card/50 rounded-2xl border-2 border-dashed border-border hover:border-primary/40 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Plus size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="font-display font-bold text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                Add Profile
              </span>
              <span className="text-xs text-muted-foreground">New member</span>
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSelection;
