import { motion } from "framer-motion";
import { Trophy, Star, Gift, Lock } from "lucide-react";
import AppNav from "@/components/AppNav";

const earnedRewards = [
  { name: "Explorer Badge", icon: "🧭", desc: "Completed 5 outdoor activities", date: "Today" },
  { name: "Sunshine Pro", icon: "☀️", desc: "Played outside 7 days in a row", date: "2 days ago" },
  { name: "30 min Screen Time", icon: "📱", desc: "Reached weekly goal", date: "This week" },
];

const availableRewards = [
  { name: "Bug Hunter Badge", icon: "🐛", req: "Find 10 different bugs", progress: 6, total: 10 },
  { name: "Nature Artist", icon: "🎨", req: "Complete 5 journal entries", progress: 2, total: 5 },
  { name: "Trail Blazer", icon: "🥾", req: "Explore 3 new trails", progress: 1, total: 3 },
  { name: "Ice Cream Trip", icon: "🍦", req: "Earn 500 points", progress: 320, total: 500 },
  { name: "New Outdoor Toy", icon: "🪁", req: "Complete 10 goals", progress: 4, total: 10 },
  { name: "Family Movie Night", icon: "🍿", req: "Whole family plays outside 3 days", progress: 1, total: 3 },
];

const RewardsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block text-5xl mb-2"
          >
            🏆
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            Rewards & Badges
          </h1>
          <p className="text-muted-foreground mt-1">
            Keep playing outside to earn awesome rewards!
          </p>

          {/* Points summary */}
          <div className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-card rounded-full shadow-card">
            <Star size={22} className="text-sunshine" />
            <span className="text-2xl font-display font-bold">320</span>
            <span className="text-muted-foreground font-semibold">points</span>
          </div>
        </motion.div>

        {/* Earned */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <Gift size={20} className="text-coral" /> Earned Rewards
          </h2>
          <div className="space-y-3">
            {earnedRewards.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card border-2 border-sunshine/20"
              >
                <div className="w-14 h-14 rounded-xl bg-sunshine/15 flex items-center justify-center text-3xl">
                  {r.icon}
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.desc}</div>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {r.date}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Available */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <Lock size={20} className="text-muted-foreground" /> Keep Going!
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableRewards.map((r, i) => {
              const pct = Math.round((r.progress / r.total) * 100);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="bg-card rounded-2xl p-4 shadow-card text-center hover:shadow-playful transition-shadow"
                >
                  <div className="text-4xl mb-2">{r.icon}</div>
                  <div className="font-display font-bold text-sm mb-1">
                    {r.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {r.req}
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-nature rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {r.progress}/{r.total}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RewardsPage;
