import { motion } from "framer-motion";
import { Star, Flame, Trophy, Compass, ChevronRight } from "lucide-react";
import AppNav from "@/components/AppNav";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const todayActivity = {
  name: "Bug Safari Adventure",
  desc: "Go outside and find 5 different bugs! Draw them in your journal.",
  time: "20 min",
  points: 30,
};

const goals = [
  { label: "Play outside 5 days", progress: 3, total: 5, icon: "🏃" },
  { label: "Try 3 new activities", progress: 2, total: 3, icon: "🌟" },
  { label: "Earn 100 points", progress: 75, total: 100, icon: "⭐" },
];

const badges = [
  { name: "Explorer", icon: "🧭", earned: true },
  { name: "Sunshine Pro", icon: "☀️", earned: true },
  { name: "Bug Hunter", icon: "🐛", earned: false },
  { name: "Nature Artist", icon: "🎨", earned: false },
];

const ChildDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-hero pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Hero greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-nature rounded-3xl p-6 md:p-8 text-primary-foreground text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-5xl mb-3"
          >
            🌞
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">
            Let's Play, Emma!
          </h1>
          <p className="text-lg opacity-90">You're doing amazing! Keep it up!</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1 bg-card/20 rounded-full px-4 py-2 font-bold">
              <Star size={18} className="text-sunshine" /> 320 points
            </div>
            <div className="flex items-center gap-1 bg-card/20 rounded-full px-4 py-2 font-bold">
              <Flame size={18} className="text-coral" /> 5 day streak!
            </div>
          </div>
        </motion.div>

        {/* Today's recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-card border-2 border-sunshine/30"
        >
          <div className="flex items-center gap-2 mb-3">
            <Compass size={20} className="text-sunshine" />
            <span className="font-display font-bold text-sm text-sunshine">
              TODAY'S ADVENTURE
            </span>
          </div>
          <h3 className="text-xl font-display font-bold mb-1">
            {todayActivity.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {todayActivity.desc}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              ⏱ {todayActivity.time} · ⭐ {todayActivity.points} pts
            </span>
            <Link to="/activities">
              <Button size="sm" className="rounded-full font-bold">
                Let's Go! <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Goal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold">My Goals</h2>
            <Link to="/goals">
              <Button variant="ghost" size="sm" className="text-primary font-semibold">
                See All <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {goals.map((g, i) => {
              const pct = Math.round(
                (g.progress / g.total) * 100
              );
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm flex items-center gap-2">
                      <span className="text-xl">{g.icon}</span> {g.label}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {g.progress}/{g.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                      className="h-full bg-gradient-sunshine rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold flex items-center gap-2">
              <Trophy size={20} className="text-sunshine" /> My Badges
            </h2>
            <Link to="/rewards">
              <Button variant="ghost" size="sm" className="text-primary font-semibold">
                All Rewards <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((b, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  b.earned
                    ? "bg-sunshine/10"
                    : "bg-muted/50 opacity-50 grayscale"
                }`}
              >
                <span className="text-3xl">{b.icon}</span>
                <span className="text-xs font-semibold text-center">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ChildDashboard;
