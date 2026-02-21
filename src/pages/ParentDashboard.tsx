import { motion } from "framer-motion";
import {
  TrendingDown,
  Target,
  Activity,
  Gift,
  Clock,
  ChevronRight,
  Sun,
  Star,
  AlertCircle,
} from "lucide-react";
import AppNav from "@/components/AppNav";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Screen Time",
    value: "-25%",
    sub: "vs last week",
    icon: TrendingDown,
    bg: "bg-secondary",
    color: "text-sky",
  },
  {
    label: "Goals Done",
    value: "4/5",
    sub: "this week",
    icon: Target,
    bg: "bg-nature-light",
    color: "text-primary",
  },
  {
    label: "Activities",
    value: "12",
    sub: "completed",
    icon: Activity,
    bg: "bg-sunshine/20",
    color: "text-sunshine",
  },
  {
    label: "Rewards",
    value: "3",
    sub: "earned",
    icon: Gift,
    bg: "bg-coral/10",
    color: "text-coral",
  },
];

const kidsProgress = [
  { name: "Emma", avatar: "👧", minutes: 45, goal: 60, points: 320 },
  { name: "Jake", avatar: "👦", minutes: 30, goal: 60, points: 210 },
];

const recentActivities = [
  { name: "Nature Scavenger Hunt", kid: "Emma", time: "Today, 3:30 PM", duration: "25 min" },
  { name: "Bike Ride Challenge", kid: "Jake", time: "Today, 2:00 PM", duration: "20 min" },
  { name: "Cloud Watching", kid: "Emma", time: "Yesterday", duration: "15 min" },
];

const ParentDashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            Welcome back, Mom! <Sun size={28} className="inline text-sunshine" />
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's how your family is doing this week.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-4 shadow-card"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Kids progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <h2 className="text-lg font-display font-bold mb-4">
            Today's Progress
          </h2>
          <div className="space-y-4">
            {kidsProgress.map((kid) => {
              const pct = Math.round((kid.minutes / kid.goal) * 100);
              return (
                <div key={kid.name} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sunshine/20 flex items-center justify-center text-2xl shrink-0">
                    {kid.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{kid.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {kid.minutes}/{kid.goal} min
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-full bg-gradient-nature rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-sunshine shrink-0">
                    <Star size={14} /> {kid.points}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Rewards You Owe */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card rounded-2xl p-5 shadow-card border-2 border-coral/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold flex items-center gap-2">
              <AlertCircle size={20} className="text-coral" /> Rewards You Owe
            </h2>
            <Link to="/parent/rewards">
              <Button variant="ghost" size="sm" className="text-primary font-semibold">
                Manage <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { kid: "Emma", avatar: "👧", reward: "Extra 30 min screen time", icon: "📱", date: "Today" },
              { kid: "Emma", avatar: "👧", reward: "Explorer Badge", icon: "🧭", date: "Yesterday" },
              { kid: "Jake", avatar: "👦", reward: "Ice cream trip", icon: "🍦", date: "2 days ago" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-coral/5 border border-coral/10">
                <div className="w-10 h-10 rounded-full bg-sunshine/20 flex items-center justify-center text-lg shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{r.icon} {r.reward}</div>
                  <div className="text-xs text-muted-foreground">{r.kid} · Earned {r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold">Recent Activities</h2>
            <Link to="/activities">
              <Button variant="ghost" size="sm" className="text-primary font-semibold">
                View All <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivities.map((act, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
              >
                <div>
                  <div className="font-semibold text-sm">{act.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {act.kid} · {act.time}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} /> {act.duration}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ParentDashboard;
