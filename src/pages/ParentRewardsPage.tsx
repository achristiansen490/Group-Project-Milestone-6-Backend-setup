import { motion } from "framer-motion";
import { Gift, CheckCircle2, Clock, AlertCircle, Star, Trophy } from "lucide-react";
import AppNav from "@/components/AppNav";
import { Button } from "@/components/ui/button";

const pendingRewards = [
  { kid: "Emma", avatar: "👧", reward: "Extra 30 min screen time", reason: "Completed nature journal", earnedDate: "Today", icon: "📱" },
  { kid: "Emma", avatar: "👧", reward: "Explorer Badge", reason: "Completed 5 outdoor activities", earnedDate: "Yesterday", icon: "🧭" },
  { kid: "Jake", avatar: "👦", reward: "Ice cream trip", reason: "Played outside 7 days in a row", earnedDate: "2 days ago", icon: "🍦" },
];

const fulfilledRewards = [
  { kid: "Emma", avatar: "👧", reward: "Sunshine Pro Badge", reason: "7-day outdoor streak", fulfilledDate: "Last week", icon: "☀️" },
  { kid: "Jake", avatar: "👦", reward: "30 min extra TV time", reason: "Weekly goal completed", fulfilledDate: "Last week", icon: "📺" },
  { kid: "Emma", avatar: "👧", reward: "New coloring book", reason: "Earned 200 points", fulfilledDate: "2 weeks ago", icon: "🎨" },
];

const upcomingRewards = [
  { kid: "Emma", avatar: "👧", reward: "New outdoor toy", progress: 75, total: 100, unit: "points", icon: "🪁" },
  { kid: "Jake", avatar: "👦", reward: "Family movie night", progress: 2, total: 4, unit: "days outside", icon: "🍿" },
  { kid: "Emma", avatar: "👧", reward: "Choose a family outing", progress: 2, total: 3, unit: "activities", icon: "🎡" },
];

const ParentRewardsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
            <Gift size={28} className="text-coral" /> Rewards Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Track what you owe and what's coming up
          </p>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-coral/10 rounded-2xl p-4 text-center"
          >
            <AlertCircle size={24} className="text-coral mx-auto mb-1" />
            <div className="text-2xl font-display font-bold">{pendingRewards.length}</div>
            <div className="text-xs text-muted-foreground font-semibold">You Owe</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-sunshine/15 rounded-2xl p-4 text-center"
          >
            <Clock size={24} className="text-sunshine mx-auto mb-1" />
            <div className="text-2xl font-display font-bold">{upcomingRewards.length}</div>
            <div className="text-xs text-muted-foreground font-semibold">Coming Up</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/10 rounded-2xl p-4 text-center"
          >
            <CheckCircle2 size={24} className="text-primary mx-auto mb-1" />
            <div className="text-2xl font-display font-bold">{fulfilledRewards.length}</div>
            <div className="text-xs text-muted-foreground font-semibold">Fulfilled</div>
          </motion.div>
        </div>

        {/* Pending / You Owe */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl p-5 shadow-card border-2 border-coral/20"
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-coral" /> Rewards You Owe
          </h2>
          <div className="space-y-3">
            {pendingRewards.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-coral/5 border border-coral/10">
                <div className="w-10 h-10 rounded-full bg-sunshine/20 flex items-center justify-center text-xl shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <span className="text-lg">{r.icon}</span> {r.reward}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {r.kid} · {r.reason} · {r.earnedDate}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full text-xs font-bold border-primary text-primary shrink-0">
                  Mark Done
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Coming Up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Clock size={20} className="text-sunshine" /> Coming Up Next
          </h2>
          <div className="space-y-3">
            {upcomingRewards.map((r, i) => {
              const pct = Math.round((r.progress / r.total) * 100);
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                  <div className="w-10 h-10 rounded-full bg-sunshine/20 flex items-center justify-center text-xl shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <span className="text-lg">{r.icon}</span> {r.reward}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden mt-1.5">
                      <div
                        className="h-full bg-gradient-sunshine rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {r.kid} · {r.progress}/{r.total} {r.unit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Fulfilled */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-primary" /> Fulfilled Rewards
          </h2>
          <div className="space-y-3">
            {fulfilledRewards.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
                <div className="w-10 h-10 rounded-full bg-sunshine/20 flex items-center justify-center text-xl shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <span className="text-lg">{r.icon}</span> {r.reward}
                    <CheckCircle2 size={14} className="text-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {r.kid} · {r.fulfilledDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ParentRewardsPage;
